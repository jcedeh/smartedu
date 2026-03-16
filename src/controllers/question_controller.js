import * as question_service from "../services/question_services.js";
import { catchAsync } from "../utils/catchAsync.js";

//create question controller
export const create_question = catchAsync(async(req, res)=> {
    const data = req.body;
    const question = await question_service.create_question(data);
    return res.status(201).json({message: "success", data: question});
})

//get all questions controller
export const get_questions = catchAsync(async(req, res)=> {
    const questions = await question_service.get_questions();
    return res.status(200).json({message: "success", data: questions});
})

//get question by id controller
export const get_question_by_id = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const question = await question_service.get_question_by_id(id);
    if(!question) {
        return res.status(404).json({message: "question not found"});
    }   
    return res.status(200).json({message: "success", data: question});
})

//update question controller
export const update_question = catchAsync(async(req, res)=> {
    const {id} = req.params;
    const data = req.body;
    const updated_question = await question_service.update_question(id, data);
    return res.status(200).json({message: "success", data: updated_question});
})

//delete question controller
export const delete_question = catchAsync(async(req, res)=> {
    const {id} = req.params;
    await question_service.delete_question(id);
    return res.status(204).json({message: "success"});
})      

//insert bulk questions controller
export const bulk_insert_questions = catchAsync(async(req, res)=> {
    const questions_array = req.body;
    const result = await question_service.bulk_insert_questions(questions_array);
    return res.status(201).json({message: "success", data: result});
})
