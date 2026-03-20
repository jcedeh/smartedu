import { catchAsync } from "../utils/catchAsync.js";
import { getDashboard_service } from "../services/dashboard_service.js";

const dashboard = catchAsync(async(req, res)=>{
    student_id = req.user.id;
    const student_performance = await getDashboard_service(student_id)
    res.status(200).json({message: success, data: student_performance});

})
