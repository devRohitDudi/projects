import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getVideo,
    addLike,
    addDislike,
    addViewAndHistory,
    uploadVideo,
    removeFromWatchHistory
} from "../controllers/video.controller.js";

import {
    likeComment,
    addComment,
    getVideoComments,
    deleteComment,
    dislikeComment
} from "../controllers/comment.controller.js";

const router = Router();

//verified
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

//verified
router.route("/watch/:video_obj_id").get(getVideo);

//verified
router
    .route("/add-view&history/:video_obj_id")
    .patch(verifyJWT, addViewAndHistory);

//verified
router
    .route("/remove-watch-history/:video_obj_id")
    .patch(verifyJWT, removeFromWatchHistory);

//verified
router.route("/comments/:video_obj_id").get(getVideoComments);

//verified
router.route("/add-like/:video_obj_id").patch(verifyJWT, addLike);

//verified
router.route("/add-dislike/:video_obj_id").patch(verifyJWT, addDislike);

// verified // can add middleware to filter bad comments
router.route("/add-comment/:video_obj_id").post(verifyJWT, addComment);

// verified
router.route("/delete-comment/:comment_obj_id").patch(verifyJWT, deleteComment);

// verified
router.route("/like-comment/:comment_obj_id").patch(verifyJWT, likeComment);

//verified
router
    .route("/dislike-comment/:comment_obj_id")
    .patch(verifyJWT, dislikeComment);

export default router;
