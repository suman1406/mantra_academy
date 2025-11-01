
import { getAllPosts } from "@/services/blogService";
import BlogListClient from "./BlogListClient";

export default async function BlogPage() {
  const postsRaw = await getAllPosts();
  const posts = JSON.parse(JSON.stringify(postsRaw || []));

  return <BlogListClient posts={posts} />;
}
