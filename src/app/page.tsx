
"use client";

import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import { SocialFeed } from "@/components/social-feed";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Testimonials } from "@/components/testimonials";
import { Philosophy } from "@/components/philosophy";
import { Community } from "@/components/community";
import { motion, useScroll, useTransform } from "framer-motion";
import { Announcement } from "@/components/announcement";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Logo animation: fade out and scale down
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  // Headline animation: fade in, then out
  const headlineOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4], [0, 1, 0]);
  const headlineScale = useTransform(scrollYProgress, [0.15, 0.25], [0.9, 1]);
  
  // Paragraph animation: fade in
  const paragraphOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.4, 0.5], [20, 0]);
  
  // Entire hero section fades out
  const heroOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);


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

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-24">
      <section ref={heroRef} className="relative w-full h-[200vh]">
        <motion.div style={{opacity: heroOpacity}} className="sticky top-0 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          
          <motion.div 
            style={{ opacity: logoOpacity, scale: logoScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Logo className="h-24 w-auto text-primary/80 opacity-80 animate-glow-pulse [animation-delay:-4s] animate-float-drift [&>span]:text-3xl [&_img]:h-24 [&_img]:w-24" />
          </motion.div>

          <motion.h1
            style={{ opacity: headlineOpacity, scale: headlineScale }}
            className="absolute inset-0 flex items-center justify-center text-4xl md:text-7xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
          >
            Welcome to Mantra Academy
          </motion.h1>

          <motion.p
             style={{ opacity: paragraphOpacity, y: paragraphY }}
            className="absolute inset-0 flex items-center justify-center max-w-3xl mx-auto text-xl md:text-2xl text-foreground/80"
          >
            Unlock the power of sound and vibration. Discover ancient mantras
            and transform your life through our expert-led courses and vibrant
            community.
          </motion.p>

        </motion.div>
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <Philosophy />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <Announcement />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <FeaturedCourses />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <Testimonials />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <Community />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full flex justify-center"
      >
        <SocialFeed />
      </motion.div>
    </div>
  );
}
