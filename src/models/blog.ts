import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  author?: string;
  date?: Date | string;
  excerpt?: string;
  content?: string;
  // support either legacy string or object with cloudinary metadata
  image?: string | any;
}

const BlogSchema = new Schema<IBlogPost>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: String,
  date: Date,
  excerpt: String,
  content: String,
  image: Schema.Types.Mixed,
}, { timestamps: true });

// If a previous model with a different image type exists in mongoose cache, replace it
if (mongoose.models.BlogPost) {
  try {
    const existingSchema = (mongoose.models.BlogPost as any).schema;
    const imagePath = existingSchema && existingSchema.path && existingSchema.path('image');
    if (imagePath && imagePath.instance === 'String') {
      delete mongoose.models.BlogPost;
    }
  } catch (e) {
    // ignore
  }
}

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogSchema);
