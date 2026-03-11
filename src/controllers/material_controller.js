import { getLearningMaterials } from "../services/material_service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const material_controller = catchAsync(async(req, res)=> {
    const { subject, topic } = req.query;
    const materials = await getLearningMaterials(subject, topic);
    return res.status(200).json({message: "success", materials});
})  
