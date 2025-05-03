import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getVideo,
    getVideoComments,
    addLike,
    addDislike,
    addComment,
    uploadVideo
} from "../controllers/video.controller.js";
const router = Router();

router.route("/video/:url").get(getVideo);

router.route("/video/upload").post(
    verifyJWT,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 3 }
    ]),
    uploadVideo
);

router.route("/comments/:url").get(getVideoComments);
router.route("/add-like/:url").post(verifyJWT, addLike);
router.route("/add-dislike/:url").post(verifyJWT, addDislike);
router.route("/add-comment/:url").post(verifyJWT, addComment);

export default router;
