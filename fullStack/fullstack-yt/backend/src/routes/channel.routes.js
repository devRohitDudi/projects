import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getChannelVideos,
    getChannelProfile,
    getChannelPosts,
    getChannelPlaylists
} from "../controllers/channel.controller.js";

const router = Router();

//verified
router
    .route("/get-channel-videos/:channel_obj_id")
    .get(verifyJWT, getChannelVideos);

//verified
router.route("/get-channel-playlists").get(verifyJWT, getChannelPlaylists);

//verified
router
    .route("/get-channel-posts/:channel_obj_id")
    .get(verifyJWT, getChannelPosts);

// verified
// applying param on first becomes dynamic route this considering every route as username
// so moving below works
router.route("/:username").get(verifyJWT, getChannelProfile);

export default router;
