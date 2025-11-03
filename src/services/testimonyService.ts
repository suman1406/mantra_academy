import connectToDatabase from "../lib/mongodb";
import { Testimony } from "../models/testimony";

export async function getTestimonies() {
  await connectToDatabase();
  return Testimony.find().sort({ createdAt: -1 }).lean();
}

export async function getTestimonyById(id: string) {
  await connectToDatabase();
  return Testimony.findById(id).lean();
}

export async function createOrUpdateTestimony(data: any) {
  await connectToDatabase();
  if (!data.name) throw new Error("Testimony must have a name");
  if (!data.feedback) throw new Error("Feedback is required");

  if (data._id) {
    const id = data._id;
    delete data._id;
    return Testimony.updateOne({ _id: id }, { $set: data }, { upsert: true });
  }

  return Testimony.create(data);
}

export async function deleteTestimony(id: string) {
  await connectToDatabase();
  return Testimony.deleteOne({ _id: id });
}
