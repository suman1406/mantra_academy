import { courses } from "@/lib/course-data";
import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/course-detail-client";

export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
