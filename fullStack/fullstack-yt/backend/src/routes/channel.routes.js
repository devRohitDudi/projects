import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getChannelVideos,
    getChannelProfile,
    getChannelPosts,
    getChannelPlaylists
} from "../controllers/channel.controller.js";

const router = Router();

// verified
router.route("/:username").get(verifyJWT, getChannelProfile);

//verified
router
    .route("/get-channel-videos/:channel_obj_id")
    .get(verifyJWT, getChannelVideos);

//verified
router
    .route("/get-channel-playlists/:channel_obj_id")
    .get(verifyJWT, getChannelPlaylists);

//verified
router
    .route("/get-channel-posts/:channel_obj_id")
    .get(verifyJWT, getChannelPosts);

export default router;
