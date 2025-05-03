import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

    console.log("channel: ", channel);

    return res
        .status(200)
        .json(
            new ApiResponse(200, { channel }, "channel fetched successfully")
        );
});

//verified
const subscribeChannel = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(200, "login is required to subscribe");
    }
    const { channelId } = req.params;

    if (!channelId) {
        throw new ApiError(300, "channel id is required to subscribe.");
    }

    //check if channel is exists or not
    const channelExistence = await User.findOne({
        username: channelId
    });

    if (!channelExistence) {
        throw new ApiError(400, "requested channel doesn't exist");
    }

    console.log("channelExistence: ", channelExistence);

    // check if already subscribed
    const subscriptionExistence = await Subscription.findOne({
        subscriber: user._id,
        channel: channelExistence._id
    });

    if (subscriptionExistence) {
        // if Subscription exists than unsubscribe
        await Subscription.deleteOne({
            subscriber: user._id,
            channel: channelExistence._id
        });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { subscriptionExistence },
                    "Unsubscribed successfully"
                )
            );
    } else {
        // else subscribe
        const subscription = new Subscription({
            subscriber: user._id,
            channel: channelExistence._id
        });
        await subscription.save({ new: true });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { subscription },
                    "Subscribed successfully"
                )
            );
    }
});

export { getChannelProfile, subscribeChannel };
