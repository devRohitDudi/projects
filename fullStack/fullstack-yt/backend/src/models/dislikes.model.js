import mongoose from "mongoose"

const dislikesSchema = new mongoose.Schema({
    onVideo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    } ,
    
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
     }
},{timestamps:true})

export const Dislike  = mongoose.model("Dislike", dislikesSchema)