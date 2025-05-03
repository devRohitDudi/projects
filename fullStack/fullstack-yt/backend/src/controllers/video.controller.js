import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Dislike } from "../models/dislike.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, tags, isPublished } = req.body;

    const user = req.user;
    if (!user) {
        throw new ApiError("Login is required to upload videos");
    }

    const videoFileLocalPath = req.files?.video[0]?.path;
    const thumbnail1LocalPath = req.files?.avatar[0]?.path;
    const thumbnail2LocalPath = req.files?.avatar[1]?.path;
    const thumbnail3LocalPath = req.files?.avatar[2]?.path;

    if (!thumbnail1LocalPath && !thumbnail2LocalPath && !thumbnail3LocalPath) {
        throw new ApiError(300, "At least 1 thumbnail is required");
    }
    if (!videoFileLocalPath) {
        throw new ApiError(300, "Video file is required");
    }

    const video = uploadOnCloudinary(videoFileLocalPath);

    const thumbnail1 = thumbnail1LocalPath
        ? uploadOnCloudinary(thumbnail1LocalPath)
        : null;
    const thumbnail2 = thumbnail2LocalPath
        ? uploadOnCloudinary(thumbnail2LocalPath)
        : null;
    const thumbnail3 = thumbnail3LocalPath
        ? uploadOnCloudinary(thumbnail3LocalPath)
        : null;

    const videosInSchema = await Video.create({
        videoURL: video.url,
        title: title,
        description: description,
        tags: tags,
        thumbnail: [thumbnail1, thumbnail2, thumbnail3],
        duration: video.duration,
        isPublished: isPublished,
        owner: user._id
    });
});

const getVideo = asyncHandler(async (req, res) => {
    const url = req.params;
    const video = await Video.findOne({ videoURL: url }).select(
        "-dislikes -likes -tags -comments"
    );

    if (!video) {
        throw new ApiError(300, "video couldn't found");
    }

    // how many Documents are in the Like schema in which this video url is available as onVideo
    const likesCount = await Like.countDocuments({ onVideo: url });
    const dislikesCount = await Dislike.countDocuments({ onVideo: url });

    const commentsCount = await Comment.countDocuments({ onVideo: url });

    if (video.isPublished == "public") {
        // for unlisted videos show on frontend
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { video, commentsCount, likesCount, dislikesCount },
                    "requested video fetched successfully"
                )
            );
    } else if (video.isPublished == "private") {
        return res.status(300).json(300, {}, "requested video is private.");
    }
});

const getVideoComments = asyncHandler(async (req, res) => {
    const url = req.params;
    const comments = await Comment.find({ onVideo: url }).limit(20);
    if (!comments) {
        throw new ApiError(300, "something is wrong with comments");
    }
    return res.status(200).json(200, { comments }, "some comments fetched");
});

const addLike = asyncHandler(async (req, res) => {
    const url = req.params;
    const user = req.user;
    const alreadyLiked = await Like.findOne({ onVideo: url, user: user });

    if (!alreadyLiked) {
        await Like.create({ onVideo: url, user: user });
    } else {
        await alreadyLiked.deleteOne();
    }

    const totalLikesOnVideo = await Like.countDocuments({ onVideo: url });

    return res.status(200).json(200, { totalLikesOnVideo }, "likes added");
});
const addDislike = asyncHandler(async (req, res) => {
    const url = req.params;
    const user = req.user;
    const alreadyDisliked = await Dislike.findOne({ onVideo: url, user: user });

    if (!alreadyDisliked) {
        await Dislike.create({ onVideo: url, user: user });
    } else {
        await alreadyDisliked.deleteOne();
    }
    const totalDislikesOnVideo = await Dislike.countDocuments({ onVideo: url });

    return res
        .status(200)
        .json(200, { totalDislikesOnVideo }, "disliked successful");
});

const addComment = asyncHandler(async (req, res) => {
    const url = req.params;
    const user = req.user;
    const message = req.message;
    if (!message) {
        throw new ApiError("Message is required to make comment");
    }
    const createdComment = await Comment.create({
        onVideo: url,
        message: message,
        publisher: user
    });

    return res
        .status(200)
        .json(200, { createdComment }, "comment added successfully");
});

const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.commentId;
    const deletedComment = await Comment.deleteOne({ _id: commentId });
    if (deletedComment.deletedCount === 1) {
        return res.status(200).json(200, {}, "Comment deleted successfully");
    } else {
        throw new ApiError("Couldn't delete comment");
    }
});

export {
    getVideo,
    getVideoComments,
    addLike,
    addDislike,
    addComment,
    uploadVideo
};
