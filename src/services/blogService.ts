import connectToDatabase from "../lib/mongodb";
import { BlogPost } from "../models/blog";

export async function getAllPosts() {
  await connectToDatabase();
  return BlogPost.find().sort({ createdAt: -1 }).lean();
}

export async function getPostBySlug(slug: string) {
  await connectToDatabase();
  return BlogPost.findOne({ slug }).lean();
}

export async function createOrUpdatePost(data: any) {
  await connectToDatabase();
  if (!data.slug) throw new Error("Blog post must have a slug");
  const doc = await BlogPost.findOneAndUpdate({ slug: data.slug }, { $set: data }, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
  return doc;
}

export async function deletePost(slug: string) {
  await connectToDatabase();
  return BlogPost.deleteOne({ slug });
}
