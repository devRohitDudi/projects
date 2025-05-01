import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    onVideo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    } ,
    message:{
        type:String,
        required: true,
     },
     publisher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
     }
},{timestamps:true})

export const Comment  = mongoose.model("comment", commentSchema)