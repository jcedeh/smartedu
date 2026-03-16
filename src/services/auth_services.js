import User from "../models/users.js";
import Student from "../models/student_profile.js";
import Parent from "../models/parent_profile.js";
import { AppError } from "../utils/AppError.js";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from "./nodemailer.js";

dotenv.config();

export const register_service = async (data)=> {
    const session = await User.startSession();
    session.startTransaction();
    
    const {first_name, last_name, email, password, confirm_password, date_of_birth, role} = data;
    //validate input
    if(!first_name || !last_name || !email || !password || !confirm_password || !date_of_birth || !role) {
        throw new AppError("all fields are required", 400);
    }
    //validate password and confirm password
    if(password !== confirm_password) {
        throw new AppError("password and confirm password do not match", 400);
    }
    //check if user exists
    const existingUser = await User.findOne({email} ).session(session);
    if(existingUser){
        throw new AppError("user already exist", 400)
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user
    const user = await User.create([
        {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            confirm_password: hashedPassword,
            date_of_birth: date_of_birth,
            role: role
        }
    ], { session });


    if(role === "student") {
        const parentAccessCode = crypto.randomBytes(4).toString('hex'); // generate a unique access code for the parent
          
        await Student.create([{
            user_id: user[0]._id,
            email: email,
            name: `${first_name} ${last_name}`,
            date_of_birth: date_of_birth,
            parent_access_code: parentAccessCode
        }], { session });

        await session.commitTransaction();
        session.endSession();   

    } else {
        // Commit transaction for non-student roles as well
        await session.commitTransaction();
        session.endSession();
    }

    
        
         
    /** 
        //send email
        await sendMail({
        to: email,
        subject: "Welcome on Board",
        html: `
            Welcome to Smart Edu
            your user id is ${user[0]._id}
            `,
        });
      */  
    return user[0];
    }


//login user
export const login_service = async (data)=> {
    const {email, password} = data;
    //validate input
    if(!email || !password) {
        throw new AppError("all fields are required", 400)
    }
    //check if user exists
    const existing_user = await User.findOne({email});
    if(!existing_user || !existing_user.isActive) {
        throw new AppError("email or password not valid", 401)
    }
    //validate password
    const is_match = await bcrypt.compare(password, existing_user.password);
    if(!is_match) {
        throw new AppError("email or password not valid", 401)
    }
    const token = jwt.sign(
        {   id: existing_user._id,
            first_name: existing_user.first_name,
            last_name: existing_user.last_name,
            email: existing_user.email,
            role: existing_user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
    return token;
}



//forget password
export const forget_password_service = async (data)=> {
    const {email} = data;
    //validate fields
        if(!email) {
            throw new AppError("email is required", 400);
        }
    //check if user exists
        const user = await User.findOne({email});
        if(!user){
            throw new AppError("user does not exist", 400);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000;

        //update fields in the database
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();
          
        //send email
      /*  await sendMail({
        to: email,
        subject: "Reset Password",
        html: `
            <h3>OTP RESET PASSWORD</h3>
            <p>your OTP is ${user.otp}</p>
            `,
        });
        */

        return otp;
        
    }

//reset password
export const reset_password_service = async (data)=> {
    const {otp, new_password} = data;
    //validate fields
        if(!otp || !new_password) {
            throw new AppError("all fields are required", 400);
        }
        //check if otp links to a user
        const user = await User.findOne({otp});
        if(!user) {
            throw new AppError("invalid otp", 400);
        }
        //checks if otp has expired
        if(user.otpExpiry < Date.now()) {
            throw new AppError("otp expired", 400);
        }
        //hash new password 
        const hashedPassword = await bcrypt.hash(new_password, 10);

        //update database fields
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();
        return user;
    }

    //activate user account
export const activate_account_service = async (userId) => {
    // accept either a raw id string or an object containing an id field
    const idToFind = typeof userId === 'object' && userId !== null ? userId.id || userId._id : userId;

    const user = await User.findById(idToFind);
    if (!user) {
        throw new AppError("user not found", 404);
    }
    user.isActive = true;
    await user.save();
    return user;
}