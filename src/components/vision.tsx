
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function Vision() {
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
    <section className="w-full max-w-6xl mx-auto px-4">
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
        <div className="relative h-64 md:h-full w-full min-h-[300px] overflow-hidden order-1 md:order-1">
             <Image
              src="/images/vision.jpg"
              alt="A vibrant cosmic nebula"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 md:p-12 order-2 md:order-2">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-card-foreground">Our Vision</h2>
            <div className="text-card-foreground/80 mt-4 space-y-4 text-base md:text-lg">
                <p>
                    To revive and nurture the timeless Yogic and Vedic culture in the heart of every Bharatiya by creating a global space for authentic learning rooted in the Gurukula tradition. Mantra Academy envisions a vibrant community connected to its spiritual roots, where mantra, knowledge, and devotion come alive to inspire self-transformation, cultural pride, and harmonious living for generations to come.
                </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
