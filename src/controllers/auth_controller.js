import { 
        register_service, 
        login_service,
        forget_password_service,
        reset_password_service
    } from "../services/auth_services.js";
import { catchAsync } from "../utils/catchAsync.js";


    //register controller
    export const register = catchAsync(async(req, res)=> {
         const {email, password, role, first_name, grade_level, child_ids} = req.body;
         const new_user = await register_service({email, password, role, first_name, grade_level, child_ids});
         return res.status(201).json({message: "success", data: new_user});

    }
    )

    //login controller
    export const login = catchAsync(async(req, res)=> {
        const {email, password} = req.body;
        const token = await login_service({email, password});
        return(res.status(200).json({message: "success", data: token}));
    })

    //forgot password
    export const forgot_password = catchAsync(async(req, res)=>{
        const {email} = req.body
        const user = await forget_password_service({email});
        return res.status(200).json({message: "otp has been sent successfully"});
    })

    //reset password
    export const reset_password = catchAsync(async(req, res)=> {
        const {otp, new_password} = req.body;
        const user = await reset_password_service({otp, new_password});
        return res.status(200).json({message: "password reset successfully"});
    })