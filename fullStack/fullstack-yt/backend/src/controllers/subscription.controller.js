import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(400, "username not provoded");
    }

    const channel = User.aggregate([
        {
            $match: { username: username?.toLowerCase() }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel", // in How many documents this username is as a channel?
                as: "subscribers" // means subscribers
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber", // in how many documents this username is as a subscriber ?
                as: "subscribing" // means subscribing
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                subscribingCount: {
                    $size: "$subscribing"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user._id, "$subscribers?.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
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
        }
    ]);

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

export { getChannelProfile };
