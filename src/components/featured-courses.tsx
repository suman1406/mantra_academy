
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courses as allCourses } from "@/lib/course-data";

const courses = allCourses.slice(0, 4);

export function FeaturedCourses() {
  return (
    <section className="w-full max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Featured Courses</h2>
        <p className="text-foreground/80 mt-2">Handpicked for your spiritual journey</p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card backdrop-blur-sm transition-all duration-500 group hover:shadow-primary/20 hover:shadow-lg text-card-foreground">
                  <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        data-ai-hint={course.aiHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <Badge variant="default" className="mb-2 bg-primary text-primary-foreground border border-primary-foreground">{course.category}</Badge>
                    <CardTitle className="font-headline text-2xl text-card-foreground">{course.title}</CardTitle>
                    <p className="text-card-foreground/70 mt-2">{course.description}</p>
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/80" />
        <CarouselNext className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/80" />
      </Carousel>
    </section>
  );
}
