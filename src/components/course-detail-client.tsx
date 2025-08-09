
"use client";

import type { Course } from "@/lib/course-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  BookOpen,
  CalendarDays,
  Video,
  Smile,
  BadgeCheck,
  Users,
  Gift,
  MessageSquare,
  School,
  User,
  GraduationCap,
  AudioWaveform,
  BookHeart,
  Flower2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCountdown } from "./course-countdown";

// Custom Dharma Wheel Icon
const DharmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="2" />
        <path d="m12 14 1.8-5.4" />
        <path d="m12 14-1.8-5.4" />
        <path d="m14.24 16.24 3.52-1.2" />
        <path d="m9.76 7.76-3.52 1.2" />
        <path d="m16.24 9.76 1.2-3.52" />
        <path d="m7.76 14.24-1.2 3.52" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
    </svg>
);


// Info card styled for spiritual beige-maroon theme
const InfoCard = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) => (
  <Card className="bg-[#EFE1D1] p-4 shadow-md rounded-xl border border-[#C9A368]/40">
    <div className="flex items-center gap-3">
      <Icon className="h-8 w-8 text-[#8B2E26]" />
      <div>
        <p className="font-semibold text-[#7A6654]">{title}</p>
        <p className="text-lg font-bold text-[#5C3B28]">{text}</p>
      </div>
    </div>
  </Card>
);

const whoCanAttendIcons: Record<string, React.ElementType> = {
    "Dharma Enthusiasts": DharmaIcon,
    "Parents & Families": Users,
    "Children & Students": School,
    "Teachers & Educators": GraduationCap,
    "Spiritual Seekers": User,
    "Samskrita & Chanting Learners": AudioWaveform,
};

const highlightIcons: Record<string, React.ElementType> = {
    "Master the Art of Chanting": AudioWaveform,
    "Go Beyond the Words": BookHeart,
    "Symbolism & Stories of the Devatās": Flower2,
    "Free E-Guide for Daily Practice": Gift,
    "Interactive Q&A + Personal Mentoring": MessageSquare,
}

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
    highlights,
    whoCanAttend,
    startDate,
  } = course;

  const getStartDateText = () => {
    if (!startDate) return "Yet to announce";
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(startDate));
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF5E4]">
      {/* Hero Section */}
      <section className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-[#8B2E26]">
              {title}
            </h1>
            <p className="text-xl text-[#3B2F2F]/90">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-[#C9A368]/50">
                  <AvatarImage src={instructor.image} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-[#7A6654]">Instructor</p>
                  <p className="font-bold text-lg text-[#5C3B28]">
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
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <InfoCard
                icon={CalendarDays}
                title="Starting from"
                text={getStartDateText()}
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

            {/* Course Highlights */}
            {highlights && (
                 <section className="mb-12">
                    <Card className="p-6 md:p-8 bg-[#EFE1D1] shadow-md rounded-xl border border-[#C9A368]/40">
                        <h2 className="text-3xl font-headline text-[#8B2E26] mb-4 border-b border-[#C9A368]/30 pb-2">
                            Course Highlights
                        </h2>
                        <ul className="space-y-4">
                            {highlights.map((highlight, index) => {
                                const Icon = highlightIcons[highlight.title as keyof typeof highlightIcons] || BadgeCheck;
                                return (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="p-2 bg-[#C9A368]/20 rounded-full mt-1">
                                           <Icon className="h-5 w-5 text-[#8B2E26]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-[#5C3B28]">{highlight.title}</h3>
                                            <p className="text-[#3B2F2F]/80">{highlight.description}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                </section>
            )}

            {/* About */}
            <section className="mb-12">
              <Card className="p-6 md:p-8 bg-[#EFE1D1] shadow-md rounded-xl border border-[#C9A368]/40">
                <h2 className="text-3xl font-headline text-[#8B2E26] mb-4 border-b border-[#C9A368]/30 pb-2">
                  Course Overview
                </h2>
                <div className="prose prose-lg max-w-none text-[#3B2F2F]/90 whitespace-pre-wrap">
                  <p>{fullDescription}</p>
                </div>
              </Card>
            </section>
            
            {/* Who Can Attend */}
            {whoCanAttend && (
                <section className="mb-12">
                    <h2 className="text-3xl font-headline text-center text-[#8B2E26] mb-8">
                        Who Can Attend?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whoCanAttend.map((attendee, index) => {
                             const Icon = whoCanAttendIcons[attendee.title as keyof typeof whoCanAttendIcons] || Users;
                            return (
                                <Card key={index} className="bg-[#EFE1D1] shadow-md rounded-xl border border-[#C9A368]/40 text-center p-6 flex flex-col items-center">
                                    <div className="p-3 bg-[#C9A368]/20 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-[#8B2E26]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#5C3B28] mb-2">{attendee.title}</h3>
                                    <p className="text-[#3B2F2F]/80 text-sm">{attendee.description}</p>
                                </Card>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Curriculum */}
            <section className="mb-12">
              <h2 className="text-3xl font-headline text-[#8B2E26] mb-4">
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
                    className="bg-[#EFE1D1] border border-[#C9A368]/30 rounded-xl px-4"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-[#5C3B28] hover:no-underline">
                      <div className="flex items-center gap-4">
                        <BookOpen className="h-5 w-5 text-[#8B2E26]" />
                        {section.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pt-2">
                        {section.lessons.map((lesson, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center p-2 rounded-md hover:bg-[#E4D3C1]"
                          >
                            <span className="flex items-center gap-2 text-[#3B2F2F]/80">
                              <BadgeCheck className="h-4 w-4 text-[#8B2E26]" />
                              {lesson.title}
                            </span>
                            <span className="text-sm text-[#7A6654]">
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
              <h2 className="text-3xl font-headline text-[#8B2E26] mb-4">
                Meet Your Instructor
              </h2>
              <Card className="p-6 md:p-8 bg-[#EFE1D1] shadow-md rounded-xl border border-[#C9A368]/40">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24 ring-2 ring-[#C9A368]/50">
                    <AvatarImage
                      src={instructor.image}
                      alt={instructor.name}
                    />
                    <AvatarFallback>
                      {instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-[#5C3B28]">
                      {instructor.name}
                    </h3>
                    <p className="text-[#7A6654]">{instructor.title}</p>
                    <p className="mt-2 text-[#3B2F2F]/80">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-headline text-[#8B2E26] mb-4">
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
                    className="bg-[#EFE1D1] border border-[#C9A368]/30 rounded-xl px-4"
                  >
                    <AccordionTrigger className="text-lg text-left font-semibold text-[#5C3B28] hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#3B2F2F]/80 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg rounded-xl overflow-hidden border border-[#C9A368]/40">
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  data-ai-hint={aiHint}
                />
              </div>
              <CardContent className="p-6 bg-[#E4D3C1]">
                <CourseCountdown targetDate={startDate ? new Date(startDate) : undefined} />
                <Button
                  size="lg"
                  className="w-full text-lg mt-4 bg-[#8B2E26] hover:bg-[#A0522D] text-white rounded-lg shadow-md"
                >
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
