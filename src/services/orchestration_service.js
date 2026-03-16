import { update_mastery } from "./mastery_update.js";
import { run_learning_engine } from "./learning_engine.js";


export const process_learning_outcome = async (student_id) => {

  await update_mastery(student_id);

  await run_learning_engine(student_id);

};