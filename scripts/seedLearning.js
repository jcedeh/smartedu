
import mongoose from "mongoose";

import Subject from "../src/models/materials/subject.js";
import Section from "../src/models/materials/section.js";
import Topic from "../src/models/materials/topic.js";
import learning_material from "../src/models/materials/learning_material.js";

import { math_curriculum } from "../src/data/math_curriculum.js";

import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

// Clear existing data before seeding
await Subject.deleteMany({});
await Section.deleteMany({});
await Topic.deleteMany({});
await learning_material.deleteMany({});

const seedLearning = async () => {

  for (const subjectData of math_curriculum) {

    const subject = await Subject.create({
      name: subjectData.subject
    });

    for (const sectionData of subjectData.sections) {

      const section = await Section.create({
        subjectId: subject._id,
        title: sectionData.title
      });

      for (const topicData of sectionData.topics) {

        const topic = await Topic.create({
          subjectId: subject._id,
          sectionId: section._id,
          title: topicData.title
        });

        await learning_material.create({
          subject: subjectData.subject,
          topic: topicData.title,
          sections: [
            {
              type: "text",
              content: topicData.material.content,
              caption: topicData.material.title
            }
          ]
        });

      }

    }

  }

  console.log("Learning materials seeded successfully");
  process.exit();
};

seedLearning();