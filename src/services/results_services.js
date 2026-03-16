export const generateSubjectResultSummary = (subject, attempt) => {

  let totalQuizzesTaken = attempt.length;
  let totalTestsPassed = 0;

  let totalCorrect = 0;
  let totalQuestions = 0;

  attempt.forEach(attempts => {

    totalCorrect += attempts.correct;
    totalQuestions += attempts.total;

    const accuracy = (attempts.correct / attempts.total) * 100;

    // pass mark = 50
    if (accuracy >= 50) {
      totalTestsPassed += 1;
    }

  });

  const overallAccuracy = totalQuestions === 0
    ? 0
    : (totalCorrect / totalQuestions) * 100;

  let gradeRemark;

  switch (true) {

    case overallAccuracy >= 90:
      gradeRemark = "Excellent";
      break;

    case overallAccuracy >= 70:
      gradeRemark = "Good";
      break;

    case overallAccuracy >= 50:
      gradeRemark = "Fair";
      break;

    default:
      gradeRemark = "Poor";

  }

  return {
    subject,
    total_quizzes_taken: totalQuizzesTaken,
    total_tests_passed: totalTestsPassed,
    overall_accuracy: Number(overallAccuracy.toFixed(2)),
    grade_remark: gradeRemark
  };
};