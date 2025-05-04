import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import path from "path";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Dislike } from "../models/dislike.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, tags = null, isPublished } = req.body;

    if (!title) {
        throw new ApiError("Title is required");
    }

    const user = req.user;
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
    const thumbnail2LocalPath = req.files?.thumbnail2[0]?.path;
    const thumbnail3LocalPath = req.files?.thumbnail3[0]?.path;

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

    const videosInSchema = await Video.create({
        videoURL: video.url,
        videoAssetId: video.asset_id,
        title: title,
        description: description,
        tags: tags,
        thumbnail1: thumbnail1.url,
        thumbnail2: thumbnail2.url ? thumbnail2.url : "",
        thumbnail3: thumbnail3.url ? thumbnail3.url : "",
        duration: video.duration,
        isPublished: isPublished,
        owner: user._id
    });

    return res
        .status(200, "video has been uploaded ")
        .json(
            new ApiResponse(
                200,
                { videosInSchema },
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

    // how many Documents are in the Like schema in which this video url is available as onVideo
    const likesCount = await Like.countDocuments({ onVideo: video_obj_id });
    const dislikesCount = await Dislike.countDocuments({
        onVideo: video_obj_id
    });
    const commentsCount = await Comment.countDocuments({
        onVideo: video_obj_id
    });

    if (video.isPublished == "public") {
        // for unlisted videos show on frontend
        return res.status(200).json(
            new ApiResponse(
                200,
                // Host your own redirect endpoint
                // load the video
                { video, commentsCount, likesCount, dislikesCount },
                "requested video fetched successfully, load video on player using provided videoURL"
            )
        );
    } else if (video.isPublished == "private") {
        return res
            .status(300)
            .json(new ApiResponse(200, {}, "requested video is private"));
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

export { getVideo, addLike, addDislike, uploadVideo };
