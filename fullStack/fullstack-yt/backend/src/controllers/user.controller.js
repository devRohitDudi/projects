import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

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
}; // utils

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
}); //success

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
}); //success

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
}); //success

const refreshTheAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(300, "Unathorized request");
    }
    const decodedRefreshToken = await jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const requesterUser = await User.findById(decodedRefreshToken._id);

    if (!requesterUser) {
        throw new ApiError(400, "invalid refresh token");
    }
    console.log("requesterUser.refreshToken: ", requesterUser.refreshToken);
    console.log("decodedRefreshToken: ", decodedRefreshToken);

    if (requesterUser.refreshToken == incomingRefreshToken) {
        try {
            const { accessToken, refreshToken } =
                generateAccessAndRefreshTokens(requesterUser._id);
            const options = {
                httpOnly: true,
                secure: true
            };

            const loggedInUser = await User.findById(requesterUser._id).select(
                "-password -refreshToken"
            );

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: loggedInUser,
                            accessToken,
                            refreshToken
                        },
                        "Access token refreshed successfully"
                    )
                );
        } catch (error) {
            throw new ApiError(400, error.message || "Error generating tokens");
        }
    } else {
        throw new ApiError(200, "refresh token is expired or used.");
    }
}); //success

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isCorrect) {
        throw new ApiError(300, "incorrect old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .cookie("accessToken", "")
        .cookie("refreshToken", "")
        .json(
            new ApiResponse(200, {}, "Password updated! now login and continue")
        );
}); //success

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched"));
}); //success

const updateDetails = asyncHandler(async (req, res) => {
    const {
        username = null,
        fullName = null,
        bio = null,
        email = null
    } = req.body || {};

    const currentUser = await User.findByIdAndUpdate(req.user._id);

    const updatedUser = await currentUser.updateOne({
        username: username !== null ? username : currentUser.username,
        fullName: fullName !== null ? fullName : currentUser.fullName,
        bio: username !== null ? bio : currentUser.bio,
        email: email !== null ? email : currentUser.email
    });

    currentUser.save({ validateBeforeSave: false });

    return res
        .status(200, "reached to updateDetails()")
        .json(
            new ApiResponse(
                200,
                { updatedUser },
                "Account details updated successfully"
            )
        );
}); // success

const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(300, "avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
        throw new ApiError(400, "error while uploading avatar");
    }

    const user = await User.findById(req.user._id);
    const oldURL = user.avatar;

    user.avatar = avatar.url;

    await user.save({ validateBeforeSave: false });

    await deleteOnCloudinary(oldURL);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { avatar: avatar.url },
                "avatar updated successfully"
            )
        );
}); //success

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(300, "coverImage file is required");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage.url) {
        throw new ApiError(400, "error while uploading coverImage");
    }

    const user = await User.findById(req.user._id);
    const oldURL = user.coverImage;

    user.coverImage = coverImage.url;

    await user.save({ validateBeforeSave: false });

    await deleteOnCloudinary(oldURL);

    res.status(200).json(
        new ApiResponse(
            200,
            { coverImage: coverImage.url },
            "coverImage updated successfully"
        )
    );
}); // success

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshTheAccessToken,
    changeUserPassword,
    getCurrentUser,
    updateDetails,
    updateAvatar,
    updateCoverImage
};
