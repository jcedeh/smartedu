import Performance from "../models/performance.js";

export const update_performance = async (student_id, attempt)=> {
    //fetch performance record for the student
    let performance = await Performance.findOne({student_id});
    if(!performance) {
        //if no performance record exists, create a new one
        performance = await Performance.create({
            student_id,
            score: 0,
            total_attempts: 0,
            correct_attempts: 0,
            failed_attempts: 0,
            streak_count: 0,
            badges_earned: 0
        });
    }
    //update performance record based on the attempt result
    performance.total_attempts += 1;
    if(attempt.is_correct) {
        performance.correct_attempts += 1;
    } else {
        performance.failed_attempts += 1;
    }   
    //calculate average score
    //performance.average_score = (performance.correct_attempts / performance.total_attempts) * 100;
    //update badges earned based on certain criteria (example: 10 correct attempts = 1 badge)
    if(performance.correct_attempts % 10 === 0) {
        performance.badges_earned += 1;
    }   
    //save the updated performance record
    await performance.save();
    return performance;
}   