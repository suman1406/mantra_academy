
"use client";

import type { Course } from "@/lib/course-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  BarChart,
  Globe,
  Download,
  Award,
  BookOpen,
  CalendarDays,
  Video,
  Smile,
  BadgeCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CourseCountdown } from "./course-countdown";
import { Badge } from "./ui/badge";

const InfoCard = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) => (
  <Card className="bg-card/80 backdrop-blur-sm p-4 text-card-foreground">
    <div className="flex items-center gap-3">
      <Icon className="h-8 w-8 text-primary" />
      <div>
        <p className="font-semibold text-card-foreground/80">{title}</p>
        <p className="text-lg font-bold text-card-foreground">{text}</p>
      </div>
    </div>
  </Card>
);

export function CourseDetailClient({ course }: { course: Course }) {
  const {
    title,
    instructor,
    description,
    fullDescription,
    image,
    aiHint,
    curriculum,
    faqs,
  } = course;

  return (
    <div className="py-12 md:py-16">
      {/* Hero Section */}
      <section className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              {title}
            </h1>
            <p className="text-xl text-foreground/80">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={instructor.image} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-bold text-lg text-foreground">
                    {instructor.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <InfoCard
                icon={CalendarDays}
                title="Starting from"
                text="Yet to announce"
              />
              <InfoCard
                icon={Clock}
                title="Live Practice Timings"
                text="7:00 PM - 8:15 PM IST"
              />
              <InfoCard
                icon={Video}
                title="Live Recordings"
                text="Available for 30 days (1080P)"
              />
              <InfoCard
                icon={Smile}
                title="If not Happy"
                text="100% money back*"
              />
            </div>

            {/* About */}
            <section className="mb-12">
              <Card className="p-6 md:p-8 bg-card/50 shadow-sm rounded-lg">
                <h2 className="text-3xl font-headline text-primary mb-4">
                  About this Course
                </h2>
                <div className="prose prose-lg max-w-none text-foreground/90">
                  <p>{fullDescription}</p>
                </div>
              </Card>
            </section>

            {/* Curriculum */}
            <section className="mb-12">
              <h2 className="text-3xl font-headline text-primary mb-4">
                Course Curriculum
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-3"
              >
                {curriculum.map((section, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="bg-card/50 border-border/40 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        {section.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pt-2">
                        {section.lessons.map((lesson, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                          >
                            <span className="flex items-center gap-2 text-foreground/80">
                              <BadgeCheck className="h-4 w-4 text-primary" />
                              {lesson.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Instructor */}
            <section className="mb-12">
              <h2 className="text-3xl font-headline text-primary mb-4">
                Meet Your Instructor
              </h2>
              <Card className="p-6 md:p-8 bg-card/50 shadow-sm rounded-lg">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={instructor.image}
                      alt={instructor.name}
                    />
                    <AvatarFallback>
                      {instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {instructor.name}
                    </h3>
                    <p className="text-muted-foreground">{instructor.title}</p>
                    <p className="mt-2 text-foreground/80">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-headline text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-3"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    value={`faq-${index}`}
                    key={index}
                    className="bg-card/50 border-border/40 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-lg text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  data-ai-hint={aiHint}
                />
              </div>
              <CardContent className="p-6 bg-card">
                <CourseCountdown />
                <Button size="lg" className="w-full text-lg mt-4">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

