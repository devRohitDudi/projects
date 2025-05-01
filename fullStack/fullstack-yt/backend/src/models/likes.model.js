import mongoose from "mongoose"

const likesSchema = new mongoose.Schema({
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

export const Like  = mongoose.model("Like", likesSchema)