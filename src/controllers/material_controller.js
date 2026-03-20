import { get_learning_materials } from "../services/material_service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const material_controller = catchAsync(async(req, res)=> {
    const { subject, topic } = req.params;
    const materials = await get_learning_materials(subject, topic);
    return res.status(200).json({message: "success", materials});
})  
