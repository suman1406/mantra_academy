
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
import { FallingMantras } from "@/components/falling-mantras";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);


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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-48 py-12">
      <motion.section
        ref={heroRef}
        className="text-center flex flex-col items-center space-y-8 relative w-full min-h-[70vh] justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <FallingMantras />
        <motion.div
          style={{ y: logoY }}
          className="relative w-80 h-80 md:w-[450px] md:h-[450px] z-10 mb-8 flex items-center justify-center"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Logo className="h-24 w-auto text-primary/80 opacity-80 animate-glow-pulse [animation-delay:-4s] animate-float-drift [&_span]:text-3xl [&_img]:h-24 [&_img]:w-24" />
          </div>
        </motion.div>

        <motion.div
          className="z-10 flex flex-col items-center space-y-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.2 },
            },
          }}
        >
          <motion.h1
            style={{ y: headingY }}
            variants={itemVariants}
            className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
          >
            Welcome to Mantra Academy
          </motion.h1>
          <motion.p
            style={{ y: textY }}
            variants={itemVariants}
            className="max-w-2xl text-lg text-foreground/80"
          >
            Unlock the power of sound and vibration. Discover ancient mantras
            and transform your life through our expert-led courses and vibrant
            community.
          </motion.p>
        </motion.div>
      </motion.section>

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
