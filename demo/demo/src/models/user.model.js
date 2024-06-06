// const mongoose =require("mongoose");

// import mongoose, { Schema } from "mongoose";
import bcrypyt from "bcrypt"
import jwt from "jsonwebtoken"
const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
      username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
      },
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
      },
      fullname:{
        type:String,
        required:true,

      },
      avatar:{
        type:String,//cloudinary url
        required:true,
      },
      coverImage:{
        type:String,//cloudinary url
      },
      watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:"Video"
        }
       ],
      password:{
        type:String,
        required:[true,"password is required "]
      },
      refreshToken:{

      }

},
{timestamps:true}
)

userSchema.pre("save",async function (next){
 if(this.isModified("password"))return next();

  this.password=await bcrypyt.hash(this.password,10)
  next()

})

userSchema.methods.isPasswordCorrect=async function(password){

  return await bcrypyt.compare(password,this.password)

}

userSchema.methods.generateAccessToken= function(){
   return  jwt.sign(
      {
        _id:this._id,
        name:this.username,
        email:this.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }

    )
}
userSchema.methods.generateRefreshToken=function(){
   return  jwt.sign(
      {
        _di:this._id,
        name:this.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
    )

}

export const User= mongoose.model("User",userSchema)