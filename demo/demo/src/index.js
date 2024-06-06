const connectDB =require("./db/index.js")
const mongoose = require("mongoose");
const { DB_NAME } = require("./constants.js");

express=require("express")
dotenv=require("dotenv").config()


app=express()

app.get('/',(req,res)=>{
    res.send("Hello")
})

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`)
})
// ;(async()=>{
//     try {
       
//        await mongoose.connect(`${process.env.MONGODB_URI}`)
//        app.on("error",()=>{
//         console.log("unable to connect to DB")
//         // throw error

//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`app listening on port ${process.env.PORT}/${DB_NAME}`)
//        })
        
//     } catch (error) {
//         console.log("error :",error)
//     }

// })()