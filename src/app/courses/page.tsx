import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
   {
    title: "Crystal Healing Basics",
    category: "Energy Work",
    image: "https://placehold.co/600x400.png",
    aiHint: "healing crystals",
    description: "Understand the power of crystals and how to use them for healing and intention setting.",
  },
  {
    title: "Mindful Living Workshop",
    category: "Mindfulness",
    image: "https://placehold.co/600x400.png",
    aiHint: "mindfulness journal",
    description: "Integrate mindfulness into every aspect of your life for greater presence and joy.",
  },
  {
    title: "Astrology for Beginners",
    category: "Divination",
    image: "https://placehold.co/600x400.png",
    aiHint: "astrology chart",
    description: "Learn to read birth charts and understand the language of the stars.",
  },
  {
    title: "Tarot Reading Fundamentals",
    category: "Divination",
    image: "https://placehold.co/600x400.png",
    aiHint: "tarot cards",
    description: "Unlock the secrets of the tarot and develop your intuition.",
  },
];

export default function CoursesPage() {
  return (
    <div className="py-12 space-y-20">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Courses</h1>
        <p className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          Explore our offerings, designed to guide you on your spiritual journey.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.title} className="h-full flex flex-col overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-accent/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={course.aiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2 bg-accent/20 text-accent-foreground">{course.category}</Badge>
                <CardTitle className="font-headline text-2xl text-primary">{course.title}</CardTitle>
                <p className="text-foreground/70 mt-2">{course.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}