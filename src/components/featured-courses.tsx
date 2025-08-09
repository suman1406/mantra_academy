import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Foundations of Mantra Science",
    category: "Beginner",
    image: "https://placehold.co/600x400.png",
    aiHint: "ancient scroll",
    description: "Learn the fundamentals of what mantras are, how they work, and correct pronunciation.",
  },
  {
    title: "Ganesha Mantras for Success",
    category: "Prosperity",
    image: "https://placehold.co/600x400.png",
    aiHint: "ganesha statue",
    description: "Invoke the energy of Ganesha to remove obstacles and attract success in your life.",
  },
  {
    title: "Mantras for Healing",
    category: "Wellness",
    image: "https://placehold.co/600x400.png",
    aiHint: "healing energy",
    description: "Explore powerful healing mantras to restore balance to your mind, body, and spirit.",
  },
  {
    title: "Advanced Vedic Chanting",
    category: "Advanced",
    image: "https://placehold.co/600x400.png",
    aiHint: "vedic text",
    description: "Deepen your practice with complex Vedic hymns and advanced chanting techniques.",
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
                    <Badge variant="default" className="mb-2 bg-card-foreground/20 text-card-foreground">{course.category}</Badge>
                    <CardTitle className="font-headline text-2xl text-card-foreground">{course.title}</CardTitle>
                    <p className="text-card-foreground/70 mt-2">{course.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                     <Button variant="outline" className="w-full group transition-all duration-500 hover:bg-primary-foreground hover:text-primary hover:border-primary-foreground" asChild>
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
