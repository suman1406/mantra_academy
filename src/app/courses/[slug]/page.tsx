
import { courses } from "@/lib/course-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  PlayCircle,
  Clock,
  BarChart,
  Users,
  Globe,
  Download,
  Award,
  BookOpen,
  Plus,
  Minus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const {
    title,
    category,
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
    <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              {title}
            </h1>
            <p className="text-xl text-primary-foreground/80">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={instructor.image}
                    alt={instructor.name}
                    data-ai-hint={instructor.aiHint}
                  />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{instructor.name}</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-primary-foreground/50" />
              <div className="flex items-center gap-1">
                <span className="font-bold">{rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>({reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="default" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Enroll Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-[-4rem] ">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2">
            {/* Course Preview */}
            <Card className="overflow-hidden mb-8 shadow-xl">
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  data-ai-hint={aiHint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="h-20 w-20 text-white/80 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </Card>

            {/* Course Description */}
            <section className="mb-12">
              <Card className="p-6 md:p-8 bg-card/50">
                <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                  About this Course
                </h2>
                <div className="prose prose-lg text-foreground/80 max-w-none">
                  {fullDescription}
                </div>
              </Card>
            </section>
            
            {/* Curriculum Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                Course Curriculum
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {curriculum.map((section, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="bg-card/20 border-border/40 rounded-lg mb-2 px-4">
                    <AccordionTrigger className="text-lg font-bold hover:no-underline">
                      <div className="flex items-center gap-4">
                         <BookOpen className="h-5 w-5 text-primary"/>
                         <span>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pt-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <li
                            key={lessonIndex}
                            className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                          >
                            <span className="flex items-center gap-2">
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
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

             {/* Instructor Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                Meet Your Instructor
              </h2>
              <Card className="p-6 md:p-8 bg-card/50">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={instructor.image}
                      alt={instructor.name}
                      data-ai-hint={instructor.aiHint}
                    />
                    <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-headline font-bold">{instructor.name}</h3>
                    <p className="text-muted-foreground">{instructor.title}</p>
                    <p className="mt-2 text-foreground/80">{instructor.bio}</p>
                  </div>
                </div>
              </Card>
            </section>


            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="bg-card/20 border-border/40 rounded-lg mb-2 px-4">
                    <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/70">
                        {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-primary">${price}</span>
                    {/* <span className="text-lg line-through text-muted-foreground">$199</span> */}
                </div>
                <Button size="lg" className="w-full">Enroll Now</Button>
                <Separator className="my-6" />
                <h3 className="text-lg font-bold mb-4">This course includes:</h3>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {duration} on-demand video</li>
                  <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {lectures} lectures</li>
                  <li className="flex items-center gap-2"><BarChart className="h-4 w-4 text-primary" /> {level}</li>
                  <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> {language}</li>
                  <li className="flex items-center gap-2"><Download className="h-4 w-4 text-primary" /> {resources} downloadable resources</li>
                  <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certificate of completion</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
