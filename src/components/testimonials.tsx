import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const testimonials = [
  {
    name: "Elena Morningstar",
    title: "Meditation Student",
    quote: "The meditation course opened my eyes to a new way of living. I feel more centered and peaceful than ever before. The guidance was authentic and deeply transformative.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman portrait happy",
  },
  {
    name: "David Chen",
    title: "Yoga Enthusiast",
    quote: "I've practiced yoga for years, but the instructors here brought a new level of spiritual depth to my practice. It's more than just poses; it's a connection to the self.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man portrait smiling",
  },
  {
    name: "Sophia Rodriguez",
    title: "Spiritual Seeker",
    quote: "Inner Light Sanctuary is truly a haven. The community is so welcoming, and the variety of courses means there's always something new to learn and explore on your journey.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman portrait content",
  },
];

const QuoteIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-primary/80"
    >
      <path
        d="M6 17C6 15.3431 7.34315 14 9 14C10.6569 14 12 15.3431 12 17C12 18.6569 10.6569 20 9 20C7.34315 20 6 18.6569 6 17ZM6 17V7H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 17C15 15.3431 16.3431 14 18 14C19.6569 14 21 15.3431 21 17C21 18.6569 19.6569 20 18 20C16.3431 20 15 18.6569 15 17ZM15 17V7H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export function Testimonials() {
  return (
    <section className="w-full max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Words of Light</h2>
        <p className="text-foreground/80 mt-2">What our community says about us</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-border/40 bg-card/80 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg group">
            <CardHeader className="p-0 mb-4">
                <QuoteIcon />
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-foreground/80 italic">"{testimonial.quote}"</p>
            </CardContent>
            <div className="flex items-center mt-6 p-0">
              <Avatar className="h-12 w-12 mr-4 overflow-hidden">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} className="group-hover:scale-110 transition-transform duration-300" />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
