import express from "express";

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500);
        console.error("Error in asyncHandler:", error).json({
            success: false,
            message: error.message
        });
    }
};

export { asyncHandler };
