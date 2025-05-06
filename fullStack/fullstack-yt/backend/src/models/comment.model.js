import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
    {
        onVideo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        onPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        message: {
            type: String,
            required: true
        },
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("comment", commentSchema);
