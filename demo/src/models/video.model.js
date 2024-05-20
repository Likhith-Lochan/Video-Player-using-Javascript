// const { default: mongoose } = require("mongoose")


const mongoose=require("mongoose")

const videoSchema=new mongoose.Schema(
    {
        videoFile:{
            type:String, //cloudinary url,
            required:true,
        },
        thumbNail:{
            type:String, //cloudinary url
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number, //cloudinary url
            required:true

        },
        view:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

},
{timestamps:true})