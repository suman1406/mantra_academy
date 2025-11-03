import mongoose, { Schema, Document } from "mongoose";

export interface ITestimony extends Document {
  name: string;
  title?: string;
  feedback: string;
  image?: any; // string or cloudinary object
  featured?: boolean;
}

const TestimonySchema = new Schema<ITestimony>(
  {
    name: { type: String, required: true },
    title: String,
    feedback: { type: String, required: true },
    image: Schema.Types.Mixed,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimony = mongoose.models.Testimony || mongoose.model<ITestimony>("Testimony", TestimonySchema);
