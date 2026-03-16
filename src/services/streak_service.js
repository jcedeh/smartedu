import Streak from "../models/streak.js";

export const update_streak = async (student_id)=> {
    //fetch streak record for the student
    let streak = await Streak.findOne({student_id});
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    if(!streak) {   
        //if no streak record exists, create a new one
        streak = await Streak.create({
            student_id,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: today
        });
    }
    const last = new Date(streak.last_activity_date);
    last.setHours(0, 0, 0, 0);

    const diff_days = (today - last) / (1000 * 60 * 60 * 24);
    if(diff_days === 1) {
        //if last activity was yesterday, increment current streak
        streak.current_streak += 1;
    
    }
    else if(diff_days > 1) {
        //if last activity was more than 1 day ago, reset current streak
        streak.current_streak = 1;
    }   
    //update longest streak if current streak exceeds it
        streak.longest_streak = Math.max(
        streak.longest_streak,
        streak.current_streak
    );
    //update last activity date
    streak.last_activity_date = today;
    //save the updated streak record
    await streak.save();
    return streak;
}