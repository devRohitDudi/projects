import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getChannelVideos,
    getChannelProfile,
    getChannelPosts,
    getChannelPlaylists
} from "../controllers/channel.controller.js";
import { subscribeChannel } from "../controllers/subscription.controller.js";
const router = Router();

//verified
router.route("/get-channel-videos/:username").get(verifyJWT, getChannelVideos);

//verified
router.route("/get-channel-playlists").get(verifyJWT, getChannelPlaylists);

//
router
    .route("/get-channel-posts/:channel_obj_id")
    .get(verifyJWT, getChannelPosts);

// verified
// applying param on first becomes dynamic route this considering every route as username
// so moving below works
router.route("/get/:username").get(verifyJWT, getChannelProfile);
router.route("/subscribe/:channelId").patch(verifyJWT, subscribeChannel);

export default router;
