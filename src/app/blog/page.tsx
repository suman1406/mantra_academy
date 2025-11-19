
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  // Avoid server-side DB access here because some dev environments
  // cannot resolve the MongoDB SRV DNS (causes a 500 during server render).
  // The client component (`BlogListClient`) will fetch `/api/blogs` and
  // fall back to bundled static blog data if the API/DB is unavailable.
  return <BlogListClient posts={[]} />;
}
