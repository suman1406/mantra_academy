import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "The Art of Meditation",
    category: "Mindfulness",
    image: "https://placehold.co/600x400.png",
    aiHint: "meditation yoga",
    description: "Master the practice of meditation and bring peace to your daily life.",
  },
  {
    title: "Chakra Healing & Balancing",
    category: "Energy Work",
    image: "https://placehold.co/600x400.png",
    aiHint: "chakra energy",
    description: "Learn to align your energy centers for physical and spiritual well-being.",
  },
  {
    title: "Introduction to Spiritualism",
    category: "Philosophy",
    image: "https://placehold.co/600x400.png",
    aiHint: "spirituality books",
    description: "Explore the fundamental concepts of spiritual thought and practice.",
  },
  {
    title: "Advanced Yoga Poses",
    category: "Yoga",
    image: "https://placehold.co/600x400.png",
    aiHint: "yoga advanced",
    description: "Deepen your yoga practice with challenging and rewarding new asanas.",
  },
];

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
              <div className="p-1">
                <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm transition-all duration-300 group hover:shadow-primary/20 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={course.aiHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">{course.category}</Badge>
                    <CardTitle className="font-headline text-2xl text-primary">{course.title}</CardTitle>
                    <p className="text-foreground/70 mt-2">{course.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                     <Button variant="outline" className="w-full group transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                        <Link href="/courses">
                           Explore Courses
                           <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
