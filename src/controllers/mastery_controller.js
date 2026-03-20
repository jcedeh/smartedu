import { get_mastery_status } from "../utils/matery_utils.js";
import { catchAsync } from "../utils/catchAsync.js";

export const get_mastery_controller = catchAsync(async (req, res) => {
  const student_id = req.user.id;

  const topics = await TopicPerformance.find({ student_id });

  const response = topics.map(topic => ({
    subject: topic.subject,
    topic: topic.topic,
    mastery_level: topic.mastery_level,
    status: get_mastery_status(topic.mastery_level)
  }));

  res.json(response);
});

