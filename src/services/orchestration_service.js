import { update_mastery } from "./mastery_update.js";
import { run_learning_engine } from "./learning_engine.js";


export const process_learning_outcome = async (studentId) => {

  await update_mastery(studentId);

  await run_learning_engine(studentId);

};