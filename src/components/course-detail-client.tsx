
"use client";

import React, { useEffect, useState } from "react";
import type { Course } from "@/context/AppDataContext";
import ResponsiveImage from "@/components/ui/responsive-image";
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
import { useToast } from "@/hooks/use-toast";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { ToastAction } from "@/components/ui/toast";

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

// OM glyph provided by user — use theme color via `currentColor`
const OmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 356 367" fill="currentColor" {...props}>
    <path d="M 90.456847,353.9498 C 51.797347,340.13485 23.72672,305.75839 12.612487,258.6184 C 7.5684267,237.22321 6.1421397,201.86984 10.323594,201.86984 C 11.712834,201.86984 15.42322,211.57056 18.568972,223.427 C 25.452892,249.37152 37.19436,273.76855 48.535988,285.69407 C 67.374717,305.50242 114.0356,313.26029 140.92106,301.05394 C 161.86409,291.54544 170.35697,268.94603 161.24995,246.95931 C 154.21242,229.96943 138.24701,224.28836 108.50834,228.19197 C 108.50834,228.19197 90.282834,208.57398 84.476417,173.73548 L 103.15738,175.42939 C 125.65731,177.46962 142.64532,172.49605 151.46236,161.28728 C 159.74765,150.75419 159.5685,146.68046 150.34841,135.96157 C 137.04396,120.49428 113.15511,124.41248 64.786577,149.99522 L 40.381632,109.08518 L 50.613137,101.2812 C 76.253387,81.724339 120.77357,71.947329 146.11011,80.309169 C 169.18841,87.925649 186.12724,118.14755 181.60247,143.63298 C 178.54327,160.86286 164.72752,184.99524 154.05369,191.75339 L 144.84862,197.58162 L 157.56351,203.31522 C 179.17018,213.05833 192.36061,205.61034 208.12001,174.76849 C 229.92949,132.0869 244.0745,121.0378 276.96658,120.99051 C 292.28176,120.96847 297.73268,122.57499 308.90312,130.4031 C 336.78213,149.94016 351.9622,190.39693 348.62804,236.27272 C 344.40474,294.37435 316.88374,329.61601 275.73415,329.61601 C 253.15086,329.61601 238.59451,321.69526 227.00729,303.10156 C 216.82976,286.76927 212.24334,254.42288 218.08805,240.19369 C 220.89208,233.36732 221.39892,233.13578 221.58223,238.59686 C 221.91916,248.63689 233.34159,264.95549 243.82827,270.37835 C 269.55794,283.68369 306.49479,266.96693 321.10832,235.4032 C 332.20339,211.4394 326.25105,165.21656 311.02084,157.06552 C 307.83453,155.36024 299.96089,153.96502 293.5244,153.96502 C 279.84214,153.96502 269.09709,163.80155 254.03263,190.11774 C 248.82442,199.21613 240.05943,210.97175 234.55486,216.24128 C 225.61134,224.80312 222.41769,225.82225 204.53067,225.82225 L 184.51412,225.82225 L 190.98415,240.19369 C 200.2451,260.76437 199.80694,294.18704 190.00976,314.53347 C 181.35272,332.51252 161.33618,350.71469 145.33374,355.16013 C 129.75572,359.4876 104.38789,358.9281 90.456847,353.9498 z M 165.8338,75.923739 C 156.97908,60.814399 151.52974,32.606158 157.46546,32.606158 C 164.43775,47.732319 178.73037,61.227101 194.03409,70.643259 C 221.52091,83.949329 249.39257,78.578529 279.84247,54.108239 C 286.54595,48.721279 292.48231,44.913138 293.0345,45.645698 C 300.4697,57.184233 313.331,66.613261 317.58219,80.021449 C 317.58219,85.678729 293.22867,101.96033 274.01214,109.15007 C 226.38264,122.8706 193.96598,117.44304 165.8338,75.923739 z M 189.83603,40.997228 L 220.84514,6.6137488 L 255.30593,38.514418 C 243.51876,48.222549 235.00994,63.289118 221.54391,70.930009 C 210.90372,63.086273 195.02308,53.837816 189.83603,40.997228 z " />
  </svg>
);


// Info card styled for spiritual beige-maroon theme
const InfoCard = ({
  icon,
  title,
  text,
}: {
  // icon can be a lucide React component or a direct emoji/text string
  icon: React.ElementType | string;
  title: string;
  text: string;
}) => (
  <Card className="bg-background p-4 shadow-md rounded-xl border border-primary/20">
    <div className="flex items-center gap-3">
      {typeof icon === 'string' ? (
        // Render emoji or text directly when provided as string
        <div className="text-2xl md:text-3xl" aria-hidden>{icon}</div>
      ) : (
        // Render lucide icon component
        React.createElement(icon as React.ElementType, { className: 'h-6 w-6 md:h-8 md:w-8 text-primary' })
      )}
      <div>
        <p className="font-semibold text-muted-foreground text-sm">{title}</p>
        <p className="text-base md:text-lg font-bold text-foreground">{text}</p>
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
  const { toast } = useToast();
  const ENROLL_FORM_URL = "https://forms.gle/weA9tXBK8jTb4GDP8";
  const {
    title,
    description,
    fullDescription,
    image,
    curriculum,
    faqs,
    highlights,
    whoCanAttend,
    startDate,
    price,
    duration,
    lectures,
    level,
    language,
    instructor,
    category,
  } = course;

  // Resolve instructor image URL from possible shapes stored in DB
  const getInstructorImageUrl = (inst: any) => {
    if (!inst) return '';
    const img = inst.image;
    if (!img) return '';
    if (typeof img === 'string') return img;
    // common cloudinary fields
    if (img.secure_url) return img.secure_url;
    if (img.url) return img.url;
    if (img.path) return img.path;
    if (img.src) return img.src;
    // fallback to empty
    return '';
  };

  const instructorImageUrlFromCourse = getInstructorImageUrl(instructor as any);
  const [instructorImageUrl, setInstructorImageUrl] = useState<string>(instructorImageUrlFromCourse || '');

  // If the course has an embedded instructor snapshot that uses a placeholder or is missing
  // prefer the canonical instructor record from the instructors API (so updating an instructor
  // in the admin UI updates the public course pages without re-saving each course).
  useEffect(() => {
    // If we already have a non-placeholder URL, keep it
    if (instructorImageUrlFromCourse && !instructorImageUrlFromCourse.includes('placehold.co')) {
      setInstructorImageUrl(instructorImageUrlFromCourse);
      return;
    }

    // Try to fetch the instructor record by _id or name
    (async () => {
      try {
        const resp = await fetch('/api/instructors');
        if (!resp.ok) return;
        const list = await resp.json();
        if (!Array.isArray(list)) return;
        const matched = (instructor && (instructor as any)._id)
          ? list.find((it: any) => String(it._id) === String((instructor as any)._id))
          : list.find((it: any) => it.name === (instructor?.name));
        if (matched) {
          const url = getInstructorImageUrl(matched as any);
          if (url) setInstructorImageUrl(url);
        }
      } catch (e) {
        // ignore fetch errors
      }
    })();
  // only run when course instructor changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor?.name, (instructor as any)?._id]);

  useEffect(() => {
  const timer = setTimeout(() => {
    toast({
      title: "Reserve Your Slot!",
      description: `Seats for '${title}' are filling up. Enroll today!`,
      action: (
        <ToastAction asChild altText="Enroll Now">
        <a href={ENROLL_FORM_URL} target="_blank" rel="noreferrer">Enroll Now</a>
        </ToastAction>
      ),
      duration: 8000,
    });
  }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, [toast, title]);

  const getStartDateText = () => {
    if (!startDate) return "Yet to announce";
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(startDate));
  };

  return (
    <div className="py-8 md:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/90">{description}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              {category && <span className="px-2 py-1 bg-muted rounded">{category}</span>}
              {level && <span className="px-2 py-1 bg-muted rounded">{level}</span>}
              {language && <span className="px-2 py-1 bg-muted rounded">{language}</span>}
              {typeof price !== 'undefined' && <span className="px-2 py-1 bg-muted rounded">₹{price}</span>}
              {typeof duration !== 'undefined' && duration > 0 && <span className="px-2 py-1 bg-muted rounded">{Math.floor(duration/60)}h {duration%60}m</span>}
              {typeof lectures !== 'undefined' && lectures > 0 && <span className="px-2 py-1 bg-muted rounded">{lectures} lectures</span>}
              {instructor && <span className="px-2 py-1 bg-muted rounded">Instructor: {instructor.name}</span>}
            </div>
            {instructor && (
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={instructorImageUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-shrink-0"
                  aria-label={`Open ${instructor.name} image`}
                >
                  <Avatar className="w-20 h-20 md:w-28 md:h-28 ring-2 ring-primary/20">
                    <AvatarImage src={instructorImageUrl || ''} alt={instructor.name} className="w-full h-full object-cover" />
                    <AvatarFallback>{instructor.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </a>
                <div>
                  <div className="font-semibold">{instructor.name}</div>
                  {instructor.title && <div className="text-sm text-muted-foreground">{instructor.title}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <main className="lg:col-span-2">
            
            {/* Mobile-only Timer */}
            <div className="block lg:hidden mb-8">
              <Card className="shadow-lg rounded-xl overflow-hidden border border-primary/20 bg-background">
                 <div className="relative aspect-video">
                    <ResponsiveImage image={image} alt={title} className="object-cover w-full h-full" />
                  </div>
                <CardContent className="p-6 bg-background">
                  <CourseCountdown targetDate={startDate ? new Date(startDate) : undefined} />
                  <Button asChild size="lg" className="w-full text-lg mt-4">
                    <a href={ENROLL_FORM_URL} target="_blank" rel="noreferrer">Enroll Now</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Info Cards (from course.badges if present; fallback to defaults) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {(() => {
                const cards: { icon: React.ElementType; title: string; text: string }[] = [];
                // Always include start date as first card
                cards.push({ icon: CalendarDays, title: 'Starting from', text: getStartDateText() });

                if (Array.isArray((course as any).badges) && (course as any).badges.length > 0) {
                  const badges = (course as any).badges as any[];
                  const iconMap: Record<string, React.ElementType> = { Clock, Video, Smile, CalendarDays, Gift, Users, School };
                  for (const b of badges) {
                    const rawIcon = b?.icon || '';
                    // if admin entered a mapped name (e.g., "Video") use the lucide icon
                    let iconEntry: React.ElementType | string = BadgeCheck;
                    if (rawIcon && iconMap[rawIcon]) {
                      iconEntry = iconMap[rawIcon];
                    } else if (rawIcon && typeof rawIcon === 'string') {
                      // detect emoji / non-ascii glyphs; prefer to render the raw string
                      let isEmoji = false;
                      try {
                        isEmoji = /\p{Extended_Pictographic}/u.test(rawIcon);
                      } catch (e) {
                        isEmoji = /[^\x00-\x7F]/.test(rawIcon);
                      }
                      iconEntry = isEmoji || rawIcon.length <= 3 ? rawIcon : BadgeCheck;
                    }
                    cards.push({ icon: iconEntry as any, title: b.title || '', text: b.subtitle || '' });
                  }
                } 
                // else {
                //   // fallback to legacy hard-coded cards
                //   cards.push({ icon: Clock, title: 'Live Practice Timings', text: '7:00 PM - 8:15 PM IST' });
                //   cards.push({ icon: Video, title: 'Live Recordings', text: 'Available for 30 days (1080P)' });
                //   cards.push({ icon: Smile, title: 'If not Happy', text: '100% money back*' });
                // }

                return cards.map((c, i) => <InfoCard key={i} icon={c.icon} title={c.title} text={c.text} />);
              })()}
            </div>


            {/* Course Highlights */}
            {highlights && highlights.length > 0 && (
                 <section className="mb-12">
                    <Card className="p-6 md:p-8 bg-background shadow-md rounded-xl border border-primary/20">
                        <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4 border-b border-border pb-2 font-semibold">
                            Course Highlights
                        </h2>
                        <ul className="space-y-4">
                            {highlights.map((highlight: any, index: number) => {
                                const Icon = highlightIcons[highlight.title as keyof typeof highlightIcons] || BadgeCheck;
                                return (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-full mt-1">
                                           <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-foreground">{highlight.title}</h3>
                                            <div className="text-foreground/80 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(highlight.description || '') }} />
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
              <Card className="p-6 md:p-8 bg-background shadow-md rounded-xl border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4 border-b border-border pb-2 font-semibold">
                  Course Overview
                </h2>
                <div className="prose prose-lg max-w-none text-foreground/90 whitespace-pre-wrap">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(fullDescription || '') }} />
                </div>
              </Card>
            </section>
            
            {/* Who Can Attend */}
            {whoCanAttend && whoCanAttend.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-headline text-center text-primary mb-8 font-semibold">
                        Who Can Attend?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoCanAttend.map((attendee: any, index: number) => {
               const Icon = whoCanAttendIcons[attendee.title as keyof typeof whoCanAttendIcons] || OmIcon;
                            return (
                                <Card key={index} className="bg-background shadow-md rounded-xl border border-primary/20 text-center p-6 flex flex-col items-center">
                                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{attendee.title}</h3>
                                    <div className="text-foreground/80 text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(attendee.description || '') }} />
                                </Card>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Curriculum */}
            {curriculum && curriculum.length > 0 && (
                <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4 font-semibold">
                    Course Curriculum
                </h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-3"
                >
                    {curriculum.map((section: any, index: number) => (
                    <AccordionItem
                        value={`item-${index}`}
                        key={index}
                        className="bg-background border border-border rounded-xl px-4"
                    >
                        <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline text-left">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-foreground">{section.title}</span>
            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                        <ul className="space-y-2 pt-2">
              {section.lessons.map((lesson: any, i: number) => (
                            <li
                                key={i}
                                className="flex justify-between items-center p-2 rounded-md hover:bg-background/10"
                            >
                                <span className="flex items-center gap-2 text-foreground/80">
                                <OmIcon className="h-4 w-4 text-primary" />
                                {lesson.title}
                                </span>
                                <span className="text-sm text-muted-foreground">
                {(() => {
                  const mins = Number(lesson.durationMinutes ?? lesson.duration ?? 0);
                  if (!mins) return null;
                  return `${Math.floor(mins/60)}h ${mins%60}m`;
                })()}
                                </span>
                            </li>
                            ))}
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </section>
            )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
                <section>
                <h2 className="text-2xl md:text-3xl font-headline text-primary mb-4 font-semibold">
                    Frequently Asked Questions
                </h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-3"
                >
                    {faqs.map((faq: any, index: number) => (
                    <AccordionItem
                        value={`faq-${index}`}
                        key={index}
                        className="bg-background border border-border rounded-xl px-4"
                    >
                        <AccordionTrigger className="text-lg text-left font-semibold text-foreground hover:no-underline">
                        {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/80 text-base">
                        <div dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(faq.answer || '') }} />
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg rounded-xl overflow-hidden border border-primary/20 bg-background">
              <div className="relative aspect-video">
                  <ResponsiveImage image={image} alt={title} className="object-cover w-full h-full" />
                </div>
              <CardContent className="p-6 bg-background">
                <CourseCountdown targetDate={startDate ? new Date(startDate) : undefined} />
                {typeof price !== 'undefined' && (
                  <div className="mt-4 text-lg font-semibold">Price: ₹{price}</div>
                )}
                <Button asChild size="lg" className="w-full text-lg mt-4">
                  <a href={ENROLL_FORM_URL} target="_blank" rel="noreferrer">Enroll Now</a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

    