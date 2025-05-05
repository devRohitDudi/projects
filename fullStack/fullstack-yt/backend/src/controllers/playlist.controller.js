import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";
import { deleteComment } from "./comment.controller.js";
import { Video } from "../models/video.model.js";

const getPlaylist = asyncHandler(async (req, res) => {
    const { playlist_id } = req.params;
    if (!playlist_id) {
        throw new ApiError("playlist_id is required");
    }

    const playlist = await Playlist.findById(playlist_id);

    if (!playlist) {
        return res
            .status(303)
            .json(new ApiResponse(300, {}, "Playlist couldn't retrieve"));
    }
    if (playlist.visibility == "private") {
        throw new ApiError("requested playlist is private");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { playlist }, "playlist fetched successfully")
        );
});

const createPlaylist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { name, description = "", visibility = "private" } = req.body;
    if (!user) {
        throw new ApiError("login is required to create playlist");
    }
    if (!name) {
        throw new ApiError(
            "In order to create a new playlist fucking name is required my friend"
        );
    }

    const createdPlaylist = await Playlist.create({
        name: name,
        description: description,
        owner: user._id,
        visibility: visibility
    });

    if (!createdPlaylist) {
        return res
            .status(303)
            .json(
                new ApiError(
                    303,
                    {},
                    "Something went wrong while creating playlist"
                )
            );
    }

    user.playlists.push(createdPlaylist);
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { createdPlaylist },
                "Playlist Created successfully"
            )
        );
});
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlist_id } = req.params;
    const user = req.user;
    if (!playlist_id) {
        throw new ApiError("Playlist_id is required to delete it");
    }
    if (!user) {
        throw new ApiError("want to delete playlist eh? login first!");
    }
    const playlist = await Playlist.findById(playlist_id);

    if (!playlist) {
        throw new ApiError("Playlist not found! maybe already deleted");
    }
    if (playlist.owner.toString() !== user._id.toString()) {
        throw new ApiError(
            "Unauthorized request! you don't have permission to delete this playlist"
        );
    }

    const deletedPlaylist = await Playlist.deleteOne({ _id: playlist_id });
    if (deletedPlaylist.deletedCount === 1) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, { deletedPlaylist }, "playlist deleted!")
            );
    } else {
        return res
            .status(200)
            .json(new ApiResponse(503, {}, "Error while deleting playlist"));
    }
});

const addToPlaylist = asyncHandler(async (req, res) => {
    const { video_id, playlist_id } = req.body;
    const user = req.user;

    if (!playlist_id) {
        throw new ApiError("Playlist_id is requied to add videos into");
    }
    if (!video_id) {
        throw new ApiError("video_id is required to add into playlist");
    }
    if (!user) {
        throw new ApiError("Login is required to add videos into playlists");
    }
    const video = await Video.findById(video_id);
    if (!video) {
        throw new ApiError("video not found on databse! maybe wrong id.");
    }

    const updatedPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlist_id, owner: user._id },
        { $addToSet: { videos: video_id } },
        { new: true }
    );

    if (!updatedPlaylist) {
        throw new ApiError("Plalist not found or Unauthorized access");
    }

    // now no need for this, only 1 db call is efficient
    // const playlist = await Playlist.findById(playlist_id);
    // if (!playlist) {
    // throw new ApiError("Playlist not found");
    // }
    // if (user._id.toString() !== (await playlist.owner.toString())) {
    //     throw new ApiError(
    //         "Unauthorized access! you cannot update this playlist"
    //     );
    // }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { updatedPlaylist },
                "playlist updated successfully"
            )
        );
});
const removeFromPlaylist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { video_id, playlist_id } = req.body;
    if (!user) {
        throw new ApiError("Login is required to remove from Playlist");
    }
    if (!playlist_id) {
        throw new ApiError("playlist_id is required to remove from");
    }
    if (!video_id) {
        throw new ApiError("video_id is required to remove ");
    }

    const updatedPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlist_id, owner: user._id },
        { $pull: { videos: video_id } },
        { new: true }
    );

    if (!updatedPlaylist) {
        throw new ApiError("Error occured while deleting video from playlist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { updatedPlaylist },
                "requested video removed from playlist"
            )
        );
});

export {
    getPlaylist,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist
};
