
"use client";

import { useAppData } from "@/context/AppDataContext";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog-post";
import type { BlogPost } from "@/context/AppDataContext";

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { blogPosts } = useAppData();
  
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}

// Note: generateStaticParams is commented out because the data is now dynamic
// and managed in a client-side context. If you move to a server-side data
// source, you can re-enable this.
// export async function generateStaticParams() {
//   // This won't work with client-side context state
//   return [];
// }
