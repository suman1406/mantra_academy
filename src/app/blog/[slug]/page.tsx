import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog-post";
import { getPostBySlug } from "@/services/blogService";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // `params` can be a thenable in some Next.js runtimes — await it first
  const { slug } = await params;

  const postDoc = await getPostBySlug(slug);

  if (!postDoc) {
    notFound();
  }

  const post = JSON.parse(JSON.stringify(postDoc));

  return <BlogPostContent post={post} />;
}

// Note: generateStaticParams is commented out because the data is now dynamic
// and managed in a client-side context. If you move to a server-side data
// source, you can re-enable this.
// export async function generateStaticParams() {
//   // This won't work with client-side context state
//   return [];
// }
