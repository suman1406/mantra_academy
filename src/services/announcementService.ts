import connectToDatabase from "../lib/mongodb";
import { Announcement } from "../models/announcement";

export async function getAnnouncements() {
  await connectToDatabase();
  return Announcement.find().sort({ createdAt: -1 }).lean();
}

export async function createOrUpdateAnnouncement(data: any) {
  await connectToDatabase();
  if (!data.title) throw new Error("Announcement must have a title");
  return Announcement.updateOne({ title: data.title }, { $set: data }, { upsert: true });
}

export async function deleteAnnouncement(title: string) {
  await connectToDatabase();
  return Announcement.deleteOne({ title });
}
