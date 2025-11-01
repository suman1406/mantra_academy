import connectToDatabase from "../lib/mongodb";
import { Course } from "../models/course";

export async function getAllCourses() {
  await connectToDatabase();
  return Course.find().sort({ createdAt: -1 }).lean();
}

export async function getCourseBySlug(slug: string) {
  await connectToDatabase();
  return Course.findOne({ slug }).lean();
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
