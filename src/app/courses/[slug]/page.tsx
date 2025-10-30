
"use client";

import { useAppData } from "@/context/AppDataContext";
import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/course-detail-client";
import { useEffect, useState } from "react";
import type { Course } from "@/context/AppDataContext";


export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { courses } = useAppData();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.slug === params.slug);
    setCourse(foundCourse);
    setLoading(false);
  }, [courses, params.slug]);

  if (loading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

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
