
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

  // Animate the logo to zoom in and then fade out
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.5]);
  const logoOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

  // Animate the headline to slide up and fade in after the logo fades
  const headlineY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Animate the paragraph to fade in after the headline
  const paragraphOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
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

  return (
    <div className="flex flex-col items-center justify-center space-y-24">
      <section
        ref={heroRef}
        className="relative w-full h-[120vh] overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
            <motion.div
              style={{ opacity: heroOpacity }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Logo */}
                <motion.div
                  style={{ opacity: logoOpacity, scale: logoScale }}
                  className="mb-12"
                >
                  <Logo className="h-24 w-auto text-primary/80 opacity-80 animate-glow-pulse [animation-delay:-4s] animate-float-drift [&>span]:text-3xl [&_img]:h-24 [&_img]:w-24" />
                </motion.div>

                {/* Headline & Paragraph Container */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Headline */}
                    <motion.h1
                        style={{ opacity: headlineOpacity, y: headlineY }}
                        className="mb-6 text-4xl md:text-7xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
                    >
                        Welcome to Mantra Academy
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p
                        style={{ opacity: paragraphOpacity }}
                        className="max-w-3xl mx-auto text-xl md:text-2xl text-foreground/80"
                    >
                        Unlock the power of sound and vibration. Discover ancient mantras
                        and transform your life through our expert-led courses and vibrant
                        community.
                    </motion.p>
                </div>
              </div>
            </motion.div>
        </div>
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
