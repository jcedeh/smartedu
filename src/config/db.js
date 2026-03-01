import mongoose from "mongoose";

//connect database
export const connectDB = ()=> mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('database connected successfully'))
.catch((err)=> console.log(err))