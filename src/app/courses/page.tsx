
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { FallingSymbols } from "@/components/falling-symbols";

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

const courseCategories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

const CourseCard = ({ course, i }: { course: typeof courses[0], i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width/2);
    const y = (e.clientY - top - height / 2) / (height/2);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.1s ease-out' }}
      className="w-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm transition-all duration-300 group hover:shadow-primary/20 hover:shadow-2xl">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              data-ai-hint={course.aiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 group-hover:from-black/60 transition-colors" />
             <Badge variant="secondary" className="absolute top-4 right-4 bg-primary/20 text-primary border-primary/40">{course.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
          <CardTitle className="font-headline text-2xl text-primary">{course.title}</CardTitle>
          <p className="text-foreground/70 mt-2 flex-grow">{course.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-primary/90 text-primary-foreground hover:bg-primary group transition-all duration-300 transform hover:scale-105">
            Explore Course
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="py-12 space-y-16 relative">
      <FallingSymbols />
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
          Expand Your Consciousness
        </h1>
        <p className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          Our courses are crafted to guide you through every stage of your spiritual awakening.
        </p>
      </motion.section>

      <section>
        <div className="flex justify-center mb-12">
            <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
                <TabsList className="bg-card/80 backdrop-blur-sm border border-border/40">
                    {courseCategories.map(category => (
                        <TabsTrigger key={category} value={category} className="text-base px-4">
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {filteredCourses.map((course, i) => (
              <CourseCard key={course.title} course={course} i={i} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
