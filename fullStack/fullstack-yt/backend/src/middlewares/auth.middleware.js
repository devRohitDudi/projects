import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const authUser = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );
        if (!authUser) {
            throw new ApiError(401, "Invalid accessToken");
        }
        req.user = authUser;
    } catch (error) {
        throw new ApiError(400, error?.message || "couldn't verify user");
    }
});
