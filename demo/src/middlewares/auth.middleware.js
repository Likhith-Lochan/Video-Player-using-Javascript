import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken"


export const verifyJWT=asyncHandler(async (req,res,next)=>{
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

    if(!token){
        throw new ApiError(401,"Unauthorized request")
    }

    const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user=await User.findById(decodedToken._id).select("-password --refreshToken")

    if(!user){
        //todo:discuss about frontend
        throw new ApiError(401,"invalid access token")
    }
    req.user=user
    next()
})