
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

  // Animate the orb's scale and opacity
  const orbScale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1.5]);
  const orbOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  // Animate the text's opacity and position
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  // Fade out the entire hero section at the end of the scroll
  const heroOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

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
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section
        ref={heroRef}
        className="relative w-full h-[200vh] overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
            <motion.div
              style={{ opacity: heroOpacity }}
              className="flex flex-col items-center justify-center text-center w-full h-full"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 celestial-background" />

              {/* Glowing Orb */}
              <motion.div
                className="absolute glowing-orb"
                style={{ scale: orbScale, opacity: orbOpacity }}
              />
              
              {/* Content Container */}
              <motion.div 
                className="z-10 flex flex-col items-center justify-center text-center space-y-6"
                style={{ y: textY, opacity: textOpacity }}
              >
                  <motion.div custom={0} initial="hidden" animate="visible" variants={textRevealVariants}>
                    <Logo className="h-24 w-auto text-primary/80 opacity-80 animate-glow-pulse [animation-delay:-4s] animate-float-drift [&>span]:text-3xl [&_img]:h-24 [&_img]:w-24" />
                  </motion.div>
                  <motion.h1 
                    custom={1}
                    initial="hidden" 
                    animate="visible" 
                    variants={textRevealVariants}
                    className="mb-6 text-4xl md:text-7xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
                  >
                      Welcome to Mantra Academy
                  </motion.h1>

                  <motion.p
                    custom={2}
                    initial="hidden" 
                    animate="visible" 
                    variants={textRevealVariants}
                    className="max-w-3xl mx-auto text-xl md:text-2xl text-foreground/80"
                  >
                      Unlock the power of sound and vibration. Discover ancient mantras
                      and transform your life through our expert-led courses and vibrant
                      community.
                  </motion.p>
              </motion.div>
            </motion.div>
        </div>
      </section>

      <div className="space-y-24">
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
    </div>
  );
}
