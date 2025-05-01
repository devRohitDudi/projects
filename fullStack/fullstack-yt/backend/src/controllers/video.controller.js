import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import{Video} from "../models/video.model.js"
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/likes.model.js";
import { Dislike } from "../models/dislikes.model.js";

const getVideo = asyncHandler(async(req,res)=>{
    const url = req.params
    const video = await Video.findOne({videoURL:url}).select("-dislikes -likes -tags -comments")

    if(!video){
        throw new ApiError(300,"video couldn't found")    
    }


     // todo: count of likes and dislikes
    // how many Documents are in the Like schema in which this video url is available as onVideo

    const result = await Video.aggregate([ // directly count in Comment using url
        { $match: { videoURL: url } },
        { $project: { commentsCount: { $size: "$comments" } } }
      ]);
      
      const commentsCount = result[0]?.commentsCount || 0;
      
    if(video.isPublished == "public"){
        // for unlisted videos show on frontend
        return res.status(200).json(new ApiResponse(200,{video,commentsCount},"requested video fetched successfully"))
    }
    else if(video.isPublished == "private"){
        return res.status(300).json(300,{},"requested video is private.")
    }
})

const getVideoComments= asyncHandler(async(req,res)=>{
    const url = req.params
    const comments = await Comment.find({ onVideo: url }).limit(20);
    if(!comments){
        throw new ApiError(300,"something is wrong with comments")    
    }
    return res.status(200).json(200,{comments},"some comments fetched")
})

const addLike = asyncHandler(async(req,res)=>{
    const url = req.params;
    const user = req.user;
    const alreadyLiked = await Like.findOne({ onVideo: url, user: user });

    if(!alreadyLiked){
    await Like.create({ onVideo: url, user: user });
    }
    else{
    await alreadyLiked.deleteOne();
    }



    const totalLikesOnVideo = await Like.countDocuments({ onVideo: url });

    return res.status(200).json(200,{totalLikesOnVideo},"likes added")
})
const addDislike = asyncHandler(async(req,res)=>{
    const url = req.params;
    const user = req.user;
    const alreadyDisliked = await Dislike.findOne({ onVideo: url, user: user });

    if(!alreadyDisliked){
    await Dislike.create({ onVideo: url, user: user });
    }
    else{
    await alreadyDisliked.deleteOne();
    }
    const totalDislikesOnVideo = await Dislike.countDocuments({ onVideo: url });

    return res.status(200).json(200,{totalDislikesOnVideo},"disliked successful")
})

const addComment = asyncHandler(async(req,res)=>{
    const url = req.params;
    const user = req.user;
    const message = req.message;
    if(!message){
    throw new ApiError("Message is required to make comment")
    }
    const createdComment = await Comment.create({onVideo:url,message:message,publisher:user})

    return res.status(200).json(200,{createdComment},"comment added successfully")
})

export {getVideo, getVideoComments,addLike,addDislike}