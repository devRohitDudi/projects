import { Router } from "express";
import {getVideo,getVideoComments} from "../controllers/video.controller.js"
const router = Router();

router.route("/video/:url").get(getVideo);
router.route("/comments/:url").get(getVideoComments);

export default router;
