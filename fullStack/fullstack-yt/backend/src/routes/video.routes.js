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

router.route("/upload").post(
    verifyJWT,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail1", maxCount: 1 },
        { name: "thumbnail2", maxCount: 1 },
        { name: "thumbnail3", maxCount: 1 }
    ]),
    uploadVideo
);
router.route("/watch/:video_id").get(getVideo);

//add views count
// if login then add to history

router.route("/comments/:video_id").get(getVideoComments);
router.route("/add-like/:video_id").post(verifyJWT, addLike);
router.route("/add-dislike/:video_id").post(verifyJWT, addDislike);
router.route("/add-comment/:video_id").post(verifyJWT, addComment);

export default router;
