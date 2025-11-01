import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  description?: string;
  link?: string;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  description: String,
  link: String,
}, { timestamps: true });

export const Announcement = mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
