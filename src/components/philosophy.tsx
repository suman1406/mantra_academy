
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion } from "framer-motion";

export function Philosophy() {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };
  
  return (
    <section className="w-full max-w-6xl">
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ transition: 'transform 0.1s ease-out' }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden md:grid md:grid-cols-2 items-center group">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Our Philosophy</h2>
            <div className="text-foreground/80 mt-4 space-y-4 text-lg">
              <p>
                We believe that sound is the primordial creative force of the universe. Within every mantra lies a seed of potential—a source of boundless peace, power, and connection. Our purpose is to provide the keys to unlock that potential.
              </p>
              <p>
                Our teachings are rooted in the timeless wisdom of the Vedas and Tantras, adapted for the modern world. We honor the science of vibration, teaching correct pronunciation, rhythm, and intention to awaken the power within each sacred syllable.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-full w-full min-h-[300px] overflow-hidden">
             <Image
              src="https://placehold.co/600x800.png"
              alt="A serene sanctuary with soft light"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="sound waves abstract"
            />
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
