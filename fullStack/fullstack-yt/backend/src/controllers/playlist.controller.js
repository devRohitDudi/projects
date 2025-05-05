import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

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
    return res
        .stauts(200)
        .json(
            new ApiResponse(200, { playlist }, "playlist fetched successfully")
        );
});

const createPlaylist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { name, description = "", visibility = "public" } = req.body;
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
const deletePlaylist = asyncHandler(async (req, res) => {});

export { getPlaylist, createPlaylist, deletePlaylist };
