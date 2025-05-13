import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Dislike } from "../models/dislike.model.js";
import { Subscription } from "../models/subscription.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";
import { subscribe } from "diagnostics_channel";

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, tags = null, visibility } = req.body;

    if (!title) {
        throw new ApiError("Title is required");
    }

    const user = await req.user;
    if (!user) {
        throw new ApiError("Login is required to upload videos");
    }

    const videoFile = req.files?.video?.[0];
    const videoFileLocalPath = videoFile.path;
    const allowedVideoExtensions = [
        ".mp4",
        ".m4v",
        ".mkv",
        ".mov",
        ".webm",
        ".avi"
    ];

    if (!videoFileLocalPath) {
        throw new ApiError(300, "Video file is required");
    }

    // Validate extension
    const videoExt = path.extname(videoFile.originalname).toLowerCase();
    if (!allowedVideoExtensions.includes(videoExt)) {
        throw new ApiError(
            415,
            `Invalid video format. Allowed: ${allowedVideoExtensions.join(", ")}`
        );
    }

    const thumbnail1LocalPath = req.files?.thumbnail1[0]?.path;
    const thumbnail2LocalPath = req.files?.thumbnail2?.[0]?.path;
    const thumbnail3LocalPath = req.files?.thumbnail3?.[0]?.path;

    if (!thumbnail1LocalPath) {
        throw new ApiError(
            300,
            `At least 1 thumbnail is required, on frontend please provide item at "thumbnail1"`
        );
    }

    const video = await uploadOnCloudinary(videoFileLocalPath);

    const thumbnail1 = await uploadOnCloudinary(thumbnail1LocalPath);

    const thumbnail2 = thumbnail2LocalPath
        ? await uploadOnCloudinary(thumbnail2LocalPath)
        : null;
    const thumbnail3 = thumbnail3LocalPath
        ? await uploadOnCloudinary(thumbnail3LocalPath)
        : null;

    console.log("thumbnail1 cloudinary: ", thumbnail1);
    console.log("video cloudinary: ", video);

    const videoInSchema = await Video.create({
        videoURL: video.url,
        videoAssetId: video.asset_id,
        title: title,
        description: description,
        tags: tags,
        thumbnail1: thumbnail1.url,
        thumbnail2: thumbnail2?.url ? thumbnail2.url : null,
        thumbnail3: thumbnail3?.url ? thumbnail3.url : null,
        duration: video.duration,
        visibility: visibility,
        owner: await user._id
    });
    if (!videoInSchema) {
        throw new ApiError("error while video document creation ");
    }
    // yeah it is created successfully
    console.log("videoInSchema:", videoInSchema);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { videoInSchema },
                "video file has been uploaded succesfully"
            )
        );
});

const getVideo = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const video = await Video.findById(video_obj_id).select(
        "-dislikes -likes -tags -comments"
    );
    if (!video) {
        throw new ApiError(300, "video couldn't found");
    }
    const channel = await User.findById({ _id: video.owner }).select(
        "username fullName avatar"
    );

    //created different method and call for this after getting video
    // if (req.user) {
    //     video.views = video.views + 1;
    //     await video.save({ validateBeforeSave: false });
    //     // channel.watchHistory =
    // }

    const subscribersCount = await Subscription.countDocuments({
        channel: channel._id
    });
    // how many Documents are in the Like schema in which this video url is available as onVideo
    const likesCount = await Like.countDocuments({ onVideo: video_obj_id });
    const dislikesCount = await Dislike.countDocuments({
        onVideo: video_obj_id
    });
    const commentsCount = await Comment.countDocuments({
        onVideo: video_obj_id
    });

    if (video.visibility == "public") {
        // for unlisted videos show on frontend
        return res.status(200).json(
            new ApiResponse(
                200,
                // Host your own redirect endpoint
                // load the video
                {
                    video,
                    commentsCount,
                    likesCount,
                    dislikesCount,
                    subscribersCount,
                    channel
                },
                "requested video fetched successfully, load video on player using provided videoURL"
            )
        );
    } else if (video.isPublished == "private") {
        throw new ApiError("Requested video is private ");
    }
});

const addLike = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const user = req.user;

    if (!user) {
        throw new ApiError(300, "login is required to like the video");
    }

    const alreadyLiked = await Like.findOne({
        onVideo: video_obj_id,
        user: user._id
    });

    if (!alreadyLiked) {
        await Like.create({ onVideo: video_obj_id, user: user._id });
        return res.status(200).json(new ApiResponse(200, {}, "like added"));
    } else {
        await alreadyLiked.deleteOne();
        return res.status(200).json(new ApiResponse(200, {}, "like removed"));
    }

    // costly operation so can be handled on frontend eh?
    // const totalLikesOnVideo = await Like.countDocuments({ onVideo: video_obj_id });
});
const addDislike = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const user = req.user;

    if (!user) {
        throw new ApiError(
            300,
            "in order to dislike this fucking video, login is required my friend."
        );
    }

    const alreadyDisliked = await Dislike.findOne({
        onVideo: video_obj_id,
        user: user._id
    });

    if (!alreadyDisliked) {
        await Dislike.create({ onVideo: video_obj_id, user: user._id });
        return res.status(200).json(new ApiResponse(200, {}, "dislike added"));
    } else {
        await alreadyDisliked.deleteOne();
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "dislike removed"));
    }

    // no need to show dislikes
    // const totalDislikesOnVideo = await Dislike.countDocuments({ onVideo: url });
});

const addViewAndHistory = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const user = req.user;
    if (!video_obj_id) {
        throw new ApiError("video_obj_id is required to add view into");
    }
    const video = await Video.findById(video_obj_id);
    if (!video) {
        throw new ApiError("Requested video not found");
    }
    video.views += 1;

    await video.save({ validateBeforeSave: false });

    if (!user) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Video view added"));
    } else {
        const addedToHistory = await User.findByIdAndUpdate(user._id, {
            $addToSet: { watchHistory: video_obj_id }
        });
        if (addedToHistory) {
            return res
                .status(200)
                .json(
                    new ApiError(
                        200,
                        {},
                        "view added & video added to watchHistory"
                    )
                );
        } else {
            return res
                .status(200)
                .json(
                    new ApiError(
                        200,
                        {},
                        "error occured while adding to watchHistory"
                    )
                );
        }
    }
});

const removeFromWatchHistory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { video_obj_id } = req.params;

    if (!user) {
        throw new ApiError("Login is required to remove watchHistory");
    }
    if (!video_obj_id) {
        throw new ApiError("videos_obj_id, my friend!");
    }

    const removedFromHistory = await User.findByIdAndUpdate(user._id, {
        $pull: { watchHistory: video_obj_id }
    });
    if (removedFromHistory) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Video removed from watchHistory"));
    } else {
        return res
            .status(200)
            .josn(
                new ApiResponse(
                    200,
                    {},
                    "Error occured while removing from watchHistory"
                )
            );
    }
});

export {
    getVideo,
    addLike,
    addDislike,
    uploadVideo,
    addViewAndHistory,
    removeFromWatchHistory
};
