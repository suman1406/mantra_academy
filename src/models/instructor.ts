import mongoose, { Schema, Document } from "mongoose";

export interface IInstructorImage {
  url?: string;
  publicId?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface IInstructor extends Document {
  name: string;
  title?: string;
  // image can be either an old string URL or the new object returned by Cloudinary
  image?: string | IInstructorImage;
}

const InstructorSchema = new Schema<IInstructor>({
  name: { type: String, required: true },
  title: String,
  // Keep flexible to support existing string URLs and the new object form
  image: Schema.Types.Mixed,
}, { timestamps: true });

// Ensure we register the updated schema even if an older model was cached by mongoose.
if (mongoose.models.Instructor) {
  try {
    const existingSchema = (mongoose.models.Instructor as any).schema;
    const imagePath = existingSchema && existingSchema.path && existingSchema.path('image');
    if (imagePath && imagePath.instance === 'String') {
      // remove the old model so we can re-register with the mixed schema
      delete mongoose.models.Instructor;
    }
  } catch (e) {
    // ignore and proceed to (re)create the model
  }
}

export const Instructor = mongoose.models.Instructor || mongoose.model<IInstructor>("Instructor", InstructorSchema);
