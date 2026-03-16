export const generate_subject_result_summary = (subject, attempt) => {

  let total_quizzes_taken = attempt.length;
  let total_tests_passed = 0;

  let total_correct = 0;
  let total_questions = 0;

  attempt.forEach(attempts => {

    total_correct += attempts.correct;
    total_questions += attempts.total;

    const accuracy = (attempts.correct / attempts.total) * 100;

    // pass mark = 50
    if (accuracy >= 50) {
      total_tests_passed += 1;
    }

  });

  const overall_accuracy = total_questions === 0
    ? 0
    : (total_correct / total_questions) * 100;

  let grade_remark;

  switch (true) {

    case overall_accuracy >= 90:
      grade_remark = "Excellent";
      break;

    case overall_accuracy >= 70:
      grade_remark = "Good";
      break;

    case overall_accuracy >= 50:
      grade_remark = "Fair";
      break;

    default:
      grade_remark = "Poor";

  }

  return {
    subject,
    total_quizzes_taken: total_quizzes_taken,
    total_tests_passed: total_tests_passed,
    overall_accuracy: Number(overall_accuracy.toFixed(2)),
    grade_remark: grade_remark
  };
};