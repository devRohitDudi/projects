import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Dislike } from "../models/dislike.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { Playlist } from "../models/playlist.model.js";
import { Post } from "../models/post.model.js";

//verified
const getChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    if (!username) {
        throw new ApiError(400, "username not provided");
    }

    // need req.user._id to retrieve isSubscribed
    // const channel = User.aggregate([
    //     {
    //         $match: { username: username?.toLowerCase() }
    //     },
    //     {
    //         $lookup: {
    //             from: "subscriptions",
    //             localField: "_id",
    //             foreignField: "channel", // in How many documents this username is as a channel?
    //             as: "subscribers" // means subscribers
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "subscriptions",
    //             localField: "_id",
    //             foreignField: "subscriber", // in how many documents this username is as a subscriber ?
    //             as: "subscribing" // means subscribing
    //         }
    //     },
    //     {
    //         $addFields: {
    //             subscribersCount: {
    //                 $size: "$subscribers"
    //             },
    //             subscribingCount: {
    //                 $size: "$subscribing"
    //             },
    //             isSubscribed: {
    //                 $cond: {
    //                     if: { $in: [req.user._id, "$subscribers?.subscriber"] },
    //                     then: true,
    //                     else: false
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             fullName: 1,
    //             username: 1,
    //             subscribersCount: 1,
    //             subscribingCount: 1,
    //             isSubscribed: 1,
    //             email: 1,
    //             avatar: 1,
    //             coverImage: 1
    //         }
    //     }
    // ]);

    // a trick for only retrieve isSubscribed if req.user._id is available
    const pipeline = [
        { $match: { username: username?.toLowerCase() } },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribing"
            }
        }
    ];

    // Only push this stage if user is logged in
    if (req.user?._id) {
        pipeline.push({
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                subscribingCount: { $size: "$subscribing" },
                isSubscribed: {
                    $in: [
                        req.user._id,
                        {
                            $map: {
                                input: "$subscribers",
                                as: "sub",
                                in: "$$sub.subscriber"
                            }
                        }
                    ]
                }
            }
        });
    } else {
        pipeline.push({
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                subscribingCount: { $size: "$subscribing" }
            }
        });
    }

    pipeline.push({
        $project: {
            fullName: 1,
            username: 1,
            subscribersCount: 1,
            subscribingCount: 1,
            isSubscribed: 1,
            email: 1,
            avatar: 1,
            coverImage: 1
        }
    });

    const channel = await User.aggregate(pipeline);

    if (!channel?.length) {
        throw new ApiError(400, "channel does not found");
    }

    const user = await User.findOne({ username: username });

    if (!user) {
        throw new ApiError(303, "channel does not exist");
    }
    console.log("Querying videos for:", user._id);

    const videosCount = await Video.countDocuments({ owner: user._id });
    channel.videosCount = videosCount;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { channel, videosCount },
                "channel fetched successfully"
            )
        );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { channel_obj_id } = req.params;
    const user = req.user;

    if (!channel_obj_id) {
        throw new ApiError("channel_obj_id is required");
    }
    const channelVideos = await Video.find({ owner: channel_obj_id }).limit(20);
    if (!channelVideos) {
        throw new ApiError("error while retrieving channel videos");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { channelVideos },
                "channel videos retrieved successfully"
            )
        );
});

const getChannelPlaylists = asyncHandler(async (req, res) => {
    const { channel_obj_id } = req.params;
    if (!channel_obj_id) {
        throw new ApiError("channel_obj_id is required to get playlists");
    }
    const user = req.user;
    const channelPlaylists = await Playlist.find({
        owner: channel_obj_id,
        visibility: "public"
    });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { channelPlaylists },
                "channel playlists fetched successfully"
            )
        );
});

const getChannelPosts = asyncHandler(async (req, res) => {
    const { channel_obj_id } = req.params;
    if (!channel_obj_id) {
        throw new ApiError("channel_obj_id is required to get posts");
    }
    const channelPosts = await Post.find({ owner: channel_obj_id }).limit(20);

    if (!channelPosts) {
        throw new ApiError("can't fetch posts! maybe Invalid channel_obj_id.");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { channelPosts },
                "some channel posts are fetched"
            )
        );
});

export {
    getChannelVideos,
    getChannelPlaylists,
    getChannelProfile,
    getChannelPosts
};
