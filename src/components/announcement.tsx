
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { useIsMobile } from "@/hooks/use-mobile";

const AnnouncementCard = ({ announcement, index }: { announcement: any, index: number }) => {
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
        transition={{ duration: 1, ease: "easeInOut", delay: index * 0.2 }}
        className="h-full"
      >
        <Card className="border-border/40 bg-card backdrop-blur-sm overflow-hidden group p-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-500 flex flex-col items-start h-full text-card-foreground">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-card-foreground/20 rounded-full">
              <Megaphone className="h-6 w-6 text-card-foreground" />
            </div>
             <h3 className="text-xl font-headline font-bold text-card-foreground">
                {announcement.title}
            </h3>
          </div>
          <div className="text-card-foreground/80 mt-2 flex-grow text-sm md:text-base">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(announcement.description || '') }} />
          </div>
          <div className="w-full mt-6">
            <Button variant="outline" className="w-full md:w-auto group" asChild>
                <Link href={announcement.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    )
}

export function Announcement({ announcements }: { announcements: any[] }) {
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
  
  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Announcements</h2>
            <p className="text-foreground/80 mt-2 text-base md:text-lg">Stay up to date with our latest news and events</p>
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
                {announcements.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <AnnouncementCard announcement={item} index={index} />
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
