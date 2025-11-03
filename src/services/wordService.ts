import connectToDatabase from "../lib/mongodb";
import { Word } from "../models/word";

export async function getWords() {
  await connectToDatabase();
  return Word.find().sort({ createdAt: -1 }).lean();
}

export async function getWordById(id: string) {
  await connectToDatabase();
  return Word.findById(id).lean();
}

export async function createOrUpdateWord(data: any) {
  await connectToDatabase();
  if (!data.name) throw new Error("Word must have a name");
  if (!data.feedback) throw new Error("Feedback is required");

  // If an _id was provided, update that document
  if (data._id) {
    const id = data._id;
    delete data._id;
    return Word.updateOne({ _id: id }, { $set: data }, { upsert: true });
  }

  // Otherwise create new
  return Word.create(data);
}

export async function deleteWord(id: string) {
  await connectToDatabase();
  return Word.deleteOne({ _id: id });
}
