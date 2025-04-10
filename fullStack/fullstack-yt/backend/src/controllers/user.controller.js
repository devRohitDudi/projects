import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "register method in user.controller.js is ready!"
    });
});

export { registerUser };
