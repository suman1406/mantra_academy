
"use client";

import ResponsiveImage from "@/components/ui/responsive-image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";


const CourseCard = ({ course }: { course: any }) => {
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
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card backdrop-blur-sm transition-all duration-500 group hover:shadow-primary/20 hover:shadow-lg text-card-foreground">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden">
            <ResponsiveImage image={course.image} alt={course.title} className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <Badge variant="default" className="mb-2 bg-primary text-primary-foreground border border-primary-foreground">{course.category}</Badge>
          <CardTitle className="font-headline text-xl md:text-2xl text-card-foreground">{course.title}</CardTitle>
          <p className="text-card-foreground/70 mt-2 text-sm md:text-base">{course.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            {typeof course.price !== 'undefined' && (
              <div className="font-semibold">₹{course.price}</div>
            )}
            {typeof course.duration !== 'undefined' && Number(course.duration) > 0 && (
              <div>{Math.floor(course.duration/60)}h {course.duration%60}m</div>
            )}
            {typeof course.lectures !== 'undefined' && course.lectures > 0 && (
              <div>{course.lectures} lectures</div>
            )}
          </div>
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


export function FeaturedCourses({ courses }: { courses: any[] }) {
  const featuredCourses = (courses || []).slice(0, 4);

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Featured Courses</h2>
        <p className="text-foreground/80 mt-2 text-base md:text-lg">Handpicked for your spiritual journey</p>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featuredCourses.map((course, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <CourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
       <div className="flex sm:hidden justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={cn(
              "h-3 w-3 rounded-full p-0 bg-primary/20 hover:bg-primary/40",
              index === current && "bg-primary"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
