
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function Philosophy() {
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
    <section className="w-full max-w-6xl">
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ transition: 'transform 0.2s ease-out' }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="border-border/40 bg-card text-card-foreground backdrop-blur-sm overflow-hidden md:grid md:grid-cols-2 items-center group">
          <div className="p-6 md:p-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-card-foreground">Our Philosophy</h2>
            <div className="text-card-foreground/80 mt-4 space-y-4 text-base md:text-lg">
              <p>
                At Mantra Academy, we bring the ancient wisdom of Bharat’s spiritual heritage into today’s world. Rooted in the timeless teachings of the Vedas, Upanishads, Itihasas, and Puranas, our goal is to make these profound truths clear, relatable, and practical for modern life.
              </p>
              <p>
                We see this wisdom not as something from the distant past, but as a living guide that can bring balance, clarity, and purpose to everyday challenges. By blending tradition with practical insights, we help seekers reconnect with their roots and embody spiritual values in ways that matter today.
              </p>
              <p>
                Our mission is simple: to share and live this timeless knowledge so it inspires a meaningful, grounded journey of self-discovery for everyone.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-full w-full min-h-[300px] overflow-hidden">
             <Image
              src="https://placehold.co/600x800.png"
              alt="A serene sanctuary with soft light"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint="sound waves abstract"
            />
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
