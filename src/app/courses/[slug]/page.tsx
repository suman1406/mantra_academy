
"use client";

import { useAppData } from "@/context/AppDataContext";
import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/course-detail-client";
import type { Course } from "@/context/AppDataContext";


export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { courses } = useAppData();
  
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

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
