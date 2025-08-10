
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { courses } from "@/lib/course-data";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const CourseCard = ({ course, i }: { course: typeof courses[0], i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width/2);
    const y = (e.clientY - top - height / 2) / (height/2);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current || isMobile) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className="w-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card backdrop-blur-sm transition-all duration-500 group hover:shadow-primary/20 hover:shadow-2xl text-card-foreground">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint={course.aiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 group-hover:from-black/60 transition-colors" />
             <Badge variant="default" className="absolute top-4 right-4 bg-primary text-primary-foreground">{course.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
          <CardTitle className="font-headline text-2xl text-card-foreground">{course.title}</CardTitle>
          <p className="text-card-foreground/70 mt-2 flex-grow">{course.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full group" asChild>
            <Link href={`/courses/${course.slug}`}>
              Explore Now
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


export default function CoursesPage() {
  return (
    <div className="py-12 space-y-16 relative flex flex-col items-center">
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
          Tune Your Vibration
        </h1>
        <p className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          Our courses are designed to guide you through the ancient science of mantras.
        </p>
      </motion.section>

      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          <AnimatePresence>
            {courses.map((course, i) => (
              <CourseCard key={course.title} course={course} i={i} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
