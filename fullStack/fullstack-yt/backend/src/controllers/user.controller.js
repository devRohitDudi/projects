import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import router from "../routes/user.routes.js";

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

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const currentUser = await User.findById(userId);
        const accessToken = await currentUser.generateAccessToken();
        const refreshToken = await currentUser.generateRefreshToken();
        currentUser.refreshToken = refreshToken;
        await currentUser.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            400,
            "Something went wrong while generating access and refresh token."
        );
    }
};

const loginUser = asyncHandler(async (req, res) => {
    // Algorithm to login
    // recieve credentials from frontend
    // username or email
    // find user
    // check password
    //  access & refresh token
    // return secure cookies

    const { username = null, email = null, password = null } = req.body || {};

    console.log("body: ", req.body);

    if (!email && !username) {
        throw new ApiError(300, "username or email is required.");
    }

    const userInstance = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!userInstance) {
        throw new ApiError(404, "User does not exist");
    }
    console.log("userInstance: ", userInstance);

    // using the injected method of bcrypt in userSchema
    const isPasswordValid = await userInstance.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        userInstance._id
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    const loggedInUser = await User.findById(userInstance._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            })
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // through auth middleware user is already injected in req
    // find the user by id
    // remove the refreshToken
    const userToLogout = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
