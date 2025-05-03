import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const port = process.env.PORT || 4000;
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:4000",
        credentials: true
    })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes import
import userRouter from "./routes/user.routes.js";
import videosRouter from "./routes/video.routes.js";

// router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videosRouter);
// app.use("/api/v1", (req, res) => {
//     return res.status(300).send("<h1>Server is listening</h1>");
// });
export default app;
