import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  slug: string;
  title: string;
  category?: string;
  image?: string;
  description?: string;
  fullDescription?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  // total duration in minutes
  duration?: number;
  lectures?: number;
  level?: string;
  language?: string;
  resources?: number;
  instructor?: any;
  curriculum?: any[];
  faqs?: any[];
  highlights?: any[];
  whoCanAttend?: any[];
  startDate?: Date;
}

const LessonSchema = new Schema({
  title: String,
  // store lesson duration as minutes (number)
  durationMinutes: Number,
}, { _id: false });

const CurriculumSchema = new Schema({
  title: String,
  lessons: [LessonSchema],
}, { _id: false });

const InstructorSchema = new Schema({
  name: String,
  title: String,
  image: Schema.Types.Mixed,
}, { _id: false });

const CourseSchema = new Schema<ICourse>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  // Keep flexible for legacy string urls or cloudinary metadata
  image: { type: Schema.Types.Mixed, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  price: { type: Number, required: true },
  rating: Number,
  reviews: Number,
  // total duration in minutes
  duration: Number,
  lectures: Number,
  level: { type: String, required: true },
  language: { type: String, required: true },
  resources: Number,
  instructor: InstructorSchema,
  curriculum: [CurriculumSchema],
  faqs: [{ question: String, answer: String }],
  highlights: [{ title: String, description: String }],
  whoCanAttend: [{ title: String, description: String }],
  startDate: { type: Date, required: true },
}, { timestamps: true });

// Replace cached model if it used the old image:String path
if (mongoose.models.Course) {
  try {
    const existing = (mongoose.models.Course as any).schema;
    const imgPath = existing && existing.path && existing.path('image');
    if (imgPath && imgPath.instance === 'String') delete mongoose.models.Course;
  } catch (e) {}
}

export const Course = mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
