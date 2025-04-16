import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    console.log("UserController files: ", req.files);

    if (
        [email, username, password, fullName].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(408, "All fields are required.");
    }

    const userExistence = await User.findOne({
        $or: [{ username }, { email }]
    });

    console.log("userExistence: ", userExistence);

    if (userExistence) {
        throw new ApiError(
            409,
            "A user is already exists with this email or username."
        );
    }
    // getting local path
    const coverImageResult = "";
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageLocalPath = req.files.coverImage[0].path;
        coverImageResult = await uploadOnCloudinary(coverImageLocalPath);
    }
    if (!avatarLocalPath) {
        throw new ApiError(410, "Avatar file is required on server.");
    }

    // upload on cloudinary
    const avatarResult = await uploadOnCloudinary(avatarLocalPath);
    if (!avatarResult) {
        throw new ApiError(411, "avatar file is required on Cloud.");
    }

    //create user in databse
    const user = await User.create({
        fullName,
        avatar: avatarResult.url,
        coverImage: coverImageResult.url || "",
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
            "Failed to register user (please check database code)"
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
