import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

import {
    getPlaylist,
    createPlaylist,
    deletePlaylist
} from "../controllers/playlist.controller.js";

router.route("/get-playlist/:playlist_id").get(verifyJWT, getPlaylist);
router.route("/create-playlist").patch(verifyJWT, createPlaylist);
router.route("/delete-playlist/:playlist_id").patch(verifyJWT, deletePlaylist);

export default router;
