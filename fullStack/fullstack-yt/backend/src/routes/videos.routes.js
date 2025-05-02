import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getVideo,
    getVideoComments,
    addLike,
    addDislike,
    addComment
} from "../controllers/video.controller.js";
const router = Router();

router.route("/video/:url").get(getVideo);
router.route("/comments/:url").get(getVideoComments);
router.route("/add-like/:url").post(verifyJWT, addLike);
router.route("/add-dislike/:url").post(verifyJWT, addDislike);
router.route("/add-comment/:url").post(verifyJWT, addComment);

export default router;
