import connectToDatabase from "../lib/mongodb";
import { BlogPost } from "../models/blog";
import { blogPosts as staticBlogPosts } from "../lib/blog-data";

export async function getAllPosts() {
  try {
    await connectToDatabase();
    return BlogPost.find().sort({ createdAt: -1 }).lean();
  } catch (err) {
    // If DB is not reachable (DNS/ECONNREFUSED), fall back to bundled static posts
    // so the site remains usable in offline/local dev.
    // eslint-disable-next-line no-console
    console.error('blogService.getAllPosts: DB unavailable, falling back to staticBlogPosts', err);
    return staticBlogPosts.map((p) => ({ ...p }));
  }
}

export async function getPostBySlug(slug: string) {
  try {
    await connectToDatabase();
    return BlogPost.findOne({ slug }).lean();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`blogService.getPostBySlug: DB unavailable for slug=${slug}, falling back to staticBlogPosts`, err);
    const found = staticBlogPosts.find((p) => p.slug === slug);
    return found ? { ...found } : null;
  }
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
