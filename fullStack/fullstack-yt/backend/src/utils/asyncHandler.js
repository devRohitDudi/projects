import express from "express";

// const asyncHandler = (requestHandler) =>
//     (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((error) =>
//             next(error)
//         );
//
// };

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
