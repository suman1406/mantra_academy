import mongoose, { Schema, Document } from "mongoose";

export interface IWord extends Document {
  name: string;
  title?: string;
  feedback: string;
  image?: any; // can be string or cloudinary result object
  featured?: boolean;
}

const WordSchema = new Schema<IWord>(
  {
    name: { type: String, required: true },
    title: String,
    feedback: { type: String, required: true },
    image: Schema.Types.Mixed,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Word = mongoose.models.Word || mongoose.model<IWord>("Word", WordSchema);
