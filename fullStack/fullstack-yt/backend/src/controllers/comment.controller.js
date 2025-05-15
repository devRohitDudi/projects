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

const getVideoComments = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({ onVideo: video_obj_id })
        .populate("publisher")
        .populate("likeCount") // number of likes using virtual
        .skip(skip)
        .limit(limit);
    if (!comments) {
        throw new ApiError("error while querying comments");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, { comments }, "some comments fetched"));
});

const addComment = asyncHandler(async (req, res) => {
    const { video_obj_id } = req.params;
    const user = req.user;
    const { message } = req.body;

    if (!user) {
        throw new ApiError(303, "login is required to add comments");
    }

    if (!message) {
        throw new ApiError("Message is required to make comment");
    }
    if (!video_obj_id) {
        throw new ApiError(303, "video_obj_id is required to comment on");
    }
    const createdComment = await Comment.create({
        onVideo: video_obj_id,
        message: message,
        publisher: user._id
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { createdComment },
                "comment added successfully"
            )
        );
});

const deleteComment = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(
            303,
            "In order to delete this fucking comment, Login is required my friend."
        );
    }
    const { comment_obj_id } = req.params;

    if (!comment_obj_id) {
        throw new ApiError("comment_obj_id is required");
    }
    // if the user is owner of video than grant the fucking permission
    //only valid user can delete comment
    const comment = await Comment.findById(comment_obj_id);
    console.log("comment:", comment);
    if (comment.publisher.toString() !== user._id.toString()) {
        throw new ApiError("You don't have permission to delete this comment");
    }

    const deletedComment = await Comment.deleteOne({ _id: comment_obj_id });

    if (deletedComment.deletedCount === 1) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Comment deleted successfully"));
    } else {
        throw new ApiError("comment not found");
    }
});

const likeComment = asyncHandler(async (req, res) => {
    const user = req.user;
    const { comment_obj_id } = req.params;

    if (!user) {
        throw new ApiError("Login is required to like comments");
    }
    if (!comment_obj_id) {
        throw new ApiError("comment_obj_id is required to like comments");
    }

    const alreadyLiked = await Like.findOne({
        onComment: comment_obj_id,
        user: user._id
    });

    if (!alreadyLiked) {
        const likedComment = await Like.create({
            onComment: comment_obj_id,
            user: user._id
        });
        if (likedComment) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { likeComment },
                        "Comment liked successfully"
                    )
                );
        } else {
            return res
                .status(300)
                .json(new ApiResponse(300, {}, "Error while liking comment"));
        }
    } else {
        const removeLike = await alreadyLiked.deleteOne();
        if (removeLike) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {},
                        "comment Like removed successfully"
                    )
                );
        } else {
            return res
                .status(300)
                .json(
                    new ApiResponse(
                        300,
                        {},
                        "error while removing comment like"
                    )
                );
        }
    }
});
const dislikeComment = asyncHandler(async (req, res) => {
    const user = req.user;
    const { comment_obj_id } = req.params;

    if (!user) {
        throw new ApiError("Login is required to dislike comments");
    }
    if (!comment_obj_id) {
        throw new ApiError("comment_obj_id is required to dislike comments");
    }

    const alreadyDisliked = await Dislike.findOne({
        onComment: comment_obj_id,
        user: user._id
    });

    if (!alreadyDisliked) {
        const dislikedComment = await Dislike.create({
            onComment: comment_obj_id,
            user: user._id
        });
        if (dislikedComment) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { likeComment },
                        "Comment disliked successfully"
                    )
                );
        } else {
            return res
                .status(300)
                .json(
                    new ApiResponse(300, {}, "Error while disliking comment")
                );
        }
    } else {
        const removedDislike = await alreadyDisliked.deleteOne();
        if (removedDislike) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {},
                        "comment dislike removed successfully"
                    )
                );
        } else {
            return res
                .status(300)
                .json(
                    new ApiResponse(
                        300,
                        {},
                        "error while removing comment dislike"
                    )
                );
        }
    }
});

export {
    getVideoComments,
    likeComment,
    addComment,
    deleteComment,
    dislikeComment
};
