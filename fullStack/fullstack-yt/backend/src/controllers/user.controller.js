import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Algorithm
    // recieve data from request
    // validate data (valid, !emply)
    // check if user already exists (email, username)
    // upload image on Cloud
    // create user in DB
    // remove password & refresh token from
    // return response
    const { fullName, email, password, username } = req.body;
    console.log("email: ", email);

    if (
        [email, username, password, fullName].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(408, "All fields are required.");
    }

    const userExistence = User.findOne({
        $or: [{ username }, { email }]
    });

    console.log("userExistence: ", userExistence);

    if (userExistence) {
        throw new ApiError(
            409,
            "A user is already exists with this email or username."
        );
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(410, "Avatar file is required on server.");
    }
    const avatarResult = await uploadOnCloudinary(avatarLocalPath);
    if (!avatarURL) {
        throw new ApiError(411, "avatar file is required on Cloud.");
    }
    const coverImageResult = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
        fullName,
        avatar: avatarResult.url,
        coverImage: coverImageResult?.url || "",
        email: email,
        username: username.toLowerCase(),
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(
            501,
            "Failed to register user.(please check databse code)"
        );
    }
    if (createdUser) {
        return res
            .status(201)
            .json(
                new ApiResponse(201, createdUser, "User registered success.")
            );
    }
});

export { registerUser };
