import connectToDatabase from "../lib/mongodb";
import { Instructor } from "../models/instructor";

export async function getAllInstructors() {
  await connectToDatabase();
  return Instructor.find().sort({ name: 1 }).lean();
}

export async function getInstructorById(id: string) {
  await connectToDatabase();
  return Instructor.findById(id).lean();
}

export async function createOrUpdateInstructor(data: any) {
  await connectToDatabase();
  if (data._id) {
    return Instructor.updateOne({ _id: data._id }, { $set: data });
  }
  if (!data.name) throw new Error("Instructor must have a name");
  return Instructor.create(data);
}

export async function deleteInstructor(id: string) {
  await connectToDatabase();
  return Instructor.deleteOne({ _id: id });
}
