export const get_mastery_status = (mastery) => {
  if (mastery < 40) return "weak";
  if (mastery < 70) return "average";
  return "strong";
};