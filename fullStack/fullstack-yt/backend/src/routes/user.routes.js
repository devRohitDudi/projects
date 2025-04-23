import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshTheAccessToken,
    changeUserPassword,
    updateDetails,
    getCurrentUser,
    updateAvatar,
    updateCoverImage
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-tokens").post(refreshTheAccessToken);
router.route("/change-Password").post(verifyJWT, changeUserPassword);
router.route("/get-current-user").post(verifyJWT, getCurrentUser);

router.route("/update-details").post(verifyJWT, updateDetails);
router
    .route("/update-avatar")
    .post(
        verifyJWT,
        upload.fields([{ name: "avatar", maxCount: 1 }]),
        updateAvatar
    );
router
    .route("/update-coverImage")
    .post(
        verifyJWT,
        upload.fields([{ name: "coverImage", maxCount: 1 }]),
        updateCoverImage
    );

export default router;
