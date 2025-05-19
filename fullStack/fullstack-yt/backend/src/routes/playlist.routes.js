import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

import {
    getPlaylist,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    getAllPlaylists,
    updateVideoStatus
} from "../controllers/playlist.controller.js";

router.route("/get-playlist/:playlist_id").get(verifyJWT, getPlaylist);
router.route("/get-all-playlists").post(verifyJWT, getAllPlaylists);
router.route("/update-video-status").patch(verifyJWT, updateVideoStatus);
router.route("/create-playlist").patch(verifyJWT, createPlaylist);
router.route("/delete-playlist/:playlist_id").patch(verifyJWT, deletePlaylist);
router.route("/add-to-playlist/").patch(verifyJWT, addToPlaylist);
router.route("/remove-from-playlist/").patch(verifyJWT, removeFromPlaylist);

export default router;
