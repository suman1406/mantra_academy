import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/course-detail-client";
import { getCourseBySlug } from "@/services/courseService";

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const courseDoc = await getCourseBySlug(params.slug);

  if (!courseDoc) {
    notFound();
  }

  // Serialize Mongoose document to plain JSON before passing to client component
  const course = JSON.parse(JSON.stringify(courseDoc));

  return <CourseDetailClient course={course} />;
}

// Note: generateStaticParams is commented out because the data is now dynamic
// and managed in a client-side context. If you move to a server-side data
// source, you can re-enable this.
// export async function generateStaticParams() {
//   return courses.map((course) => ({
//     slug: course.slug,
//   }));
// }
