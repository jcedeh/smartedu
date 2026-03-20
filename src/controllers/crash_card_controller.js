import CrashCard from '../models/crash_cards.js';
import {catchAsync} from '../utils/catchAsync.js'

export const crash_card = catchAsync(async(req, res)=>{
    student_id = req.user.id;
    weak_topics = req.body;
    const cards = await CrashCard.find({student_id});
    if(cards.length > 0) {
        return res.status(200).json({message: "success", data: cards});
    }
    
});

