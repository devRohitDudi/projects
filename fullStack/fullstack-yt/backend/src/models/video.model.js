import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoURL: {
            type: String, //cloudinary URL
            required: true
        },
        title: {
            type: String,
            required: true,
            min: 3,
            max: 100
        },
        description: {
            type: String,
            min: 3,
            max: 500
        },
        thumbnail: [
            {
                type: String, //cloudinary URL
                required: true
            }
        ],
        duration: {
            type: Number, //cloudinary URL
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Likes"
            }
        ],

        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "dislikes"
            }
        ],
        isPublished: {
            type: String,
            enum: ["public", "private", "unlisted"],
            default: "private"
        },
        tags: {
            type: [String],
            default: []
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
