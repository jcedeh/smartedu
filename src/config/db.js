import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

//connect database
export const connectDB = ()=> mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('database connected successfully'))
.catch((err)=> console.log(err))