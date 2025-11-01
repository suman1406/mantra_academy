
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    name: "Priya Sharma",
    title: "Mantra Student",
    quote: "The foundational course changed my life. I never understood the science behind mantras until now. The instructors are authentic and the teachings are profound.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Rajesh Kumar",
    title: "Yoga Teacher",
    quote: "As a yoga teacher, I thought I knew about mantras. Mantra Academy took my understanding to a whole new level. My own teaching has become so much more powerful.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Sunita Patel",
    title: "Spiritual Seeker",
    quote: "Mantra Academy is an incredible resource. The community is supportive, and the depth of knowledge shared is unparalleled. It's a must for any serious spiritual seeker.",
    avatar: "https://placehold.co/100x100.png",
  },
   {
    name: "David Chen",
    title: "Meditation Practitioner",
    quote: "The clarity and precision of the teachings here are exceptional. It has brought a new dimension to my daily meditation practice. Highly recommended!",
    avatar: "https://placehold.co/100x100.png",
  },
];

const QuoteIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-card-foreground/80"
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

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const onMouseLeave = () => {
        if (!cardRef.current || isMobile) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ transition: 'transform 0.2s ease-out' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="h-full"
        >
            <Card className="border-border/40 bg-card backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-primary/20 hover:shadow-lg group h-full">
              <CardHeader className="p-0 mb-4">
                  <QuoteIcon />
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="text-card-foreground/80 italic text-sm md:text-base">"{testimonial.quote}"</p>
              </CardContent>
              <div className="flex items-center mt-6 p-0">
                <Avatar className="h-12 w-12 md:h-16 md:w-16 mr-4 overflow-hidden">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} className="group-hover:scale-110 transition-transform duration-500" />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-card-foreground text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-sm text-card-foreground/60">{testimonial.title}</p>
                </div>
              </div>
            </Card>
        </motion.div>
    )
}

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Words of Power</h2>
        <p className="text-foreground/80 mt-2 text-base md:text-lg">What our students say about us</p>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                 <div className="p-1 h-full">
                    <TestimonialCard testimonial={testimonial} />
                 </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
      <div className="flex sm:hidden justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={cn(
              "h-3 w-3 rounded-full p-0 bg-primary/20 hover:bg-primary/40",
              index === current && "bg-primary"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
