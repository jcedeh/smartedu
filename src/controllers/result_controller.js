import subject_result_summary from "../models/subject_result_summary.js";
import {catchAsync} from "../utils/catchAsync.js";
import Student from "../models/student_profile.js";


export const get_results = catchAsync(async(req, res)=> {
    const parent_access_code = req.body;
    if(!parent_access_code){
        return res.status(400).json({message: "parent code is required"});
    }
    const student = await Student.findOne(parent_access_code);
    if(!student){
        
        return res.status(404).json({message: "student not found"});
    }
    console.log(student.user_id)
    const result = await subject_result_summary.findOne(student.student_id);
    if(!result){
        return res.status(404).json({message: "result not found"});
    }
    return res.status(200).json({message: "success", data: result});

})
