import Streak from "../models/streak.js";
import Badge from "../models/badges.js";
import SubjectPerformance from "../models/subject_performance.js";
import TopicPerformance from "../models/topic_performance.js";

export const getDashboard_service = async (student_id) => {

  const subjectPerformance = await SubjectPerformance.find({ studentId });

  const weakTopics = await TopicPerformance.find({
    student_id,
    isWeak: true
  });

  const streak = await Streak.findOne({ student_id });

  const badges = await Badge.find({ student_id });

  return
   {
      subjectPerformance,
      weakTopics,
      streak,
      badges
    }
  };
