"use client";

import type { Course } from "@/lib/course-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  PlayCircle,
  Clock,
  BarChart,
  Globe,
  Download,
  Award,
  BookOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function CourseDetailClient({ course }: { course: Course }) {
  const {
    title,
    instructor,
    rating,
    reviews,
    description,
    fullDescription,
    image,
    aiHint,
    price,
    duration,
    lectures,
    level,
    language,
    resources,
    curriculum,
    faqs,
  } = course;

  return (
    <div className="bg-[#FAF5E4] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#EFE1D1] border-b-4 border-[#C9A368] shadow-md">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C3B28]">
              {title}
            </h1>
            <p className="text-lg text-[#3B2F2F]">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={instructor.image} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-[#5C3B28]">{instructor.name}</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-[#C9A368]" />
              <div className="flex items-center gap-1 text-[#5C3B28]">
                <span className="font-bold">{rating}</span>
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>({reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#8B2E26] text-white hover:bg-[#A0522D] rounded-lg"
              >
                Enroll Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B2E26] text-[#8B2E26] hover:bg-[#E4D3C1]"
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-[-4rem] relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            {/* Course Preview */}
            <Card className="overflow-hidden mb-8 shadow-lg rounded-lg bg-[#E4D3C1]">
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  data-ai-hint={aiHint}
                />
              </div>
            </Card>

            {/* About */}
            <section className="mb-12">
              <Card className="p-6 md:p-8 bg-[#EFE1D1] shadow-sm rounded-lg">
                <h2 className="text-3xl font-bold text-[#8B2E26] mb-4">
                  About this Course
                </h2>
                <p className="text-[#3B2F2F]">{fullDescription}</p>
              </Card>
            </section>

            {/* Curriculum */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#8B2E26] mb-4">
                Course Curriculum
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {curriculum.map((section, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="bg-[#E4D3C1] border border-[#C9A368] rounded-lg mb-2 px-4"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-[#5C3B28]">
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
                            className="flex justify-between items-center p-2 rounded-md hover:bg-[#EFE1D1]"
                          >
                            <span className="flex items-center gap-2 text-[#3B2F2F]">
                              <PlayCircle className="h-4 w-4 text-[#A0522D]" />
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
              <h2 className="text-3xl font-bold text-[#8B2E26] mb-4">
                Meet Your Instructor
              </h2>
              <Card className="p-6 md:p-8 bg-[#EFE1D1] shadow-sm rounded-lg">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={instructor.image}
                      alt={instructor.name}
                    />
                    <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-[#5C3B28]">
                      {instructor.name}
                    </h3>
                    <p className="text-[#7A6654]">{instructor.title}</p>
                    <p className="mt-2 text-[#3B2F2F]">{instructor.bio}</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-bold text-[#8B2E26] mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    value={`faq-${index}`}
                    key={index}
                    className="bg-[#E4D3C1] border border-[#C9A368] rounded-lg mb-2 px-4"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-[#5C3B28]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#3B2F2F]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg rounded-lg bg-[#EFE1D1]">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-[#8B2E26]">
                    ${price}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-[#8B2E26] text-white hover:bg-[#A0522D] rounded-lg"
                >
                  Enroll Now
                </Button>
                <Separator className="my-6 bg-[#C9A368]" />
                <h3 className="text-lg font-bold text-[#5C3B28] mb-4">
                  This course includes:
                </h3>
                <ul className="space-y-3 text-sm text-[#3B2F2F]">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#8B2E26]" /> {duration} on-demand video
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#8B2E26]" /> {lectures} lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-[#8B2E26]" /> {level}
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#8B2E26]" /> {language}
                  </li>
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-[#8B2E26]" /> {resources} downloadable resources
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#8B2E26]" /> Certificate of completion
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
