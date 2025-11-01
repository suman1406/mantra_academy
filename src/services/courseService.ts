import connectToDatabase from "../lib/mongodb";
import { Course } from "../models/course";

export async function getAllCourses() {
  await connectToDatabase();
  return Course.find().sort({ createdAt: -1 }).lean();
}

export async function getCourseBySlug(slug: string) {
  await connectToDatabase();
  const doc = await Course.findOne({ slug }).lean();
  if (!doc) return null;
  const courseDoc: any = doc;
  // If total duration is missing but curriculum has lesson durations, compute total
  if ((courseDoc.duration === undefined || courseDoc.duration === null) && Array.isArray(courseDoc.curriculum)) {
    let total = 0;
    for (const section of courseDoc.curriculum) {
      if (Array.isArray(section.lessons)) {
        for (const lesson of section.lessons) {
          total += Number(lesson.durationMinutes || 0);
        }
      }
    }
    courseDoc.duration = total;
  }
  return courseDoc;
}

export async function createOrUpdateCourse(data: any) {
  await connectToDatabase();
  if (!data.slug) throw new Error("Course must have a slug");
  // Use findOneAndUpdate to return the created/updated document
  const doc = await Course.findOneAndUpdate({ slug: data.slug }, { $set: data }, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
  return doc;
}

export async function deleteCourse(slug: string) {
  await connectToDatabase();
  return Course.deleteOne({ slug });
}
