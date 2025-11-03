
import { getAllCourses } from "../../services/courseService";
// Force dynamic rendering so courses list always reflects DB state
export const dynamic = 'force-dynamic';
import CourseGridClient from "./CourseGridClient";
import { AnimatedSection } from "@/components/animated-section";

export default async function CoursesPage() {
  const courses = await getAllCourses();
  // Convert Mongoose documents to plain JSON-safe objects before passing to client components
  const coursesData = JSON.parse(JSON.stringify(courses || []));

  return (
    <div className="py-12 md:py-16 space-y-12 md:space-y-16 relative flex flex-col items-center">
      <AnimatedSection>
        <section className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
            Tune Your Vibration
          </h1>
          <p className="mt-4 md:mt-6 max-w-3xl mx-auto space-y-4 text-base md:text-lg text-foreground/80">
            Our courses are designed to guide you through the ancient science of mantras.
          </p>
        </section>
      </AnimatedSection>

      <CourseGridClient courses={coursesData} />
    </div>
  );
}
