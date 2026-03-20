import subject_result_summary from "../models/subject_result_summary.js";

export const generate_subject_result_summary = async (
  student_id,
  subject,
  attempt,
  
) => {
  try {
    // 1. Find existing summary
    let existing_summary = await subject_result_summary
      .findOne({ student_id, subject })
      

    // 2. Extract values from new attempt
    const new_correct = attempt.score;
    const new_total = attempt.answers.length;
    const passed = attempt.passed;

    // 3. If no existing summary → create new
    if (!existing_summary) {
      const accuracy = new_total === 0 ? 0 : new_correct / new_total;

      let grade_remark;

  switch (true) {

    case accuracy >= 0.9:
      grade_remark = "Excellent";
      break;

    case accuracy >= 0.7:
      grade_remark = "Good";
      break;

    case accuracy >= 0.5:
      grade_remark = "Fair";
      break;

    default:
      grade_remark = "Poor";

  }

      const new_summary = await subject_result_summary.create([{
        student_id,
        subject,
        total_quizzes_taken: 1,
        total_tests_passed: passed ? 1 : 0,
        total_correct: new_correct,
        total_questions: new_total,
        accuracy: accuracy,
        grade_remark: grade_remark
      }]);

      return new_summary[0];
    }

    // 4. Update existing summary (incremental update)
    let total_quizzes_taken = existing_summary.total_quizzes_taken + 1;
    let total_tests_passed =
      existing_summary.total_tests_passed + (passed ? 1 : 0);
    let total_correct = existing_summary.total_correct + new_correct;
    let total_questions = existing_summary.total_questions + new_total;

    const accuracy =
      total_questions === 0 ? 0 : (total_correct / total_questions) * 100 ;

    let grade_remark;

    switch (true) {
      case accuracy >= 90:
        grade_remark = "Excellent";
        break;
      case accuracy >= 70:
        grade_remark = "Good";
        break;
      case accuracy >= 50:
        grade_remark = "Fair";
        break;
      default:
        grade_remark = "Poor";
    }
    existing_summary.total_quizzes_taken = total_quizzes_taken;
    existing_summary.total_tests_passed = total_tests_passed;
    existing_summary.total_correct = total_correct;
    existing_summary.total_questions = total_questions;
    existing_summary.accuracy = accuracy;
    existing_summary.grade_remark = grade_remark;

    await existing_summary.save();

    return existing_summary;

  } catch (error) {
    throw new Error("Error updating subject result summary: " + error.message);
  }
};