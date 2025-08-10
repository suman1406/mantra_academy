
"use client";

import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Testimonials } from "@/components/testimonials";
import { Philosophy } from "@/components/philosophy";
import { Vision } from "@/components/vision";
import { Community } from "@/components/community";
import { motion } from "framer-motion";
import { Announcement } from "@/components/announcement";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const glyphs = ["ॐ", "प्र", "ज्ञा", "नं", "ब्र", "ह्म", "अ", "हं", "सः"];

const FuturisticGlyph = ({ index }: { index: number }) => {
  const [style, setStyle] = useState({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const angle = Math.random() * 2 * Math.PI;
    const baseRadius = isMobile ? 80 : 200;
    const randomRadius = isMobile ? 60 : 150;
    const radius = baseRadius + Math.random() * randomRadius;
    
    setStyle({
      '--tx': `${Math.cos(angle) * radius}px`,
      '--ty': `${Math.sin(angle) * radius}px`,
      '--delay': `${Math.random() * 10}s`,
    });
  }, [isMobile]);

  return (
    <div className="glyph-particle" style={style}>
      {glyphs[index % glyphs.length]}
    </div>
  );
};


const Mandala = () => {
  const isMobile = useIsMobile();
  const baseSize = isMobile ? 80 : 200;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 4, ease: "circOut" },
      }}
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          style={{
            rotate: i * 30,
          }}
        >
          <motion.div
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent left-1/2 -translate-x-1/2"
            initial={{ height: "0%" }}
            animate={{ height: "100%", transition: { duration: 2, delay: 1 } }}
          />
        </motion.div>
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary/30 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: `${(i + 1) * baseSize}px`,
            height: `${(i + 1) * baseSize}px`,
            opacity: 1,
            transition: { duration: 1.5, delay: 1.5 + i * 0.2, ease: "easeOut" },
          }}
        />
      ))}
    </motion.div>
  )
};


export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        staggerChildren: 0.3,
      },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 2.5 + i * 0.2,
        duration: 1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="relative w-full h-[90vh] md:h-screen overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 celestial-background" />
        
        {/* Mandala and Glyphs */}
        <div className="absolute inset-0">
          <Mandala />
          {[...Array(20)].map((_, i) => <FuturisticGlyph key={i} index={i}/>)}
        </div>
        
        {/* Content */}
        <div className="z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
          <motion.div custom={0} initial="hidden" animate="visible" variants={textRevealVariants}>
            <Logo className="h-20 w-auto text-primary drop-shadow-lg [&>span]:text-2xl md:[&>span]:text-3xl [&_img]:h-20 [&_img]:w-20" />
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="mb-4 md:mb-6 text-4xl sm:text-5xl md:text-7xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
          >
            Welcome to Mantra Academy
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="max-w-xs sm:max-w-xl md:max-w-3xl mx-auto text-base md:text-2xl text-foreground/80"
          >
            Unlock the power of sound and vibration. Discover ancient mantras
            and transform your life through our expert-led courses and vibrant
            community.
          </motion.p>
        </div>
      </section>

      <div className="space-y-16 md:space-y-24 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <Philosophy />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <Vision />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <Announcement />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <FeaturedCourses />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <Testimonials />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="w-full flex justify-center py-8"
        >
          <Community />
        </motion.div>
      </div>
    </div>
  );
}

