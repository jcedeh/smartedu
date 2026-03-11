import { create_crash_cards } from "../services/crashCard_service.js";
import {catchAsync} from '../utils/catchAsync.js'

export const crash_card = catchAsync(async(req, res)=>{
    student_id = req.user;
    weakTopics = req.body;
    const cards = await create_crash_cards(student_id, weakTopics);
    res.staus(200).json({message: success, data: cards});
});

