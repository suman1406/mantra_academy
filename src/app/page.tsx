
"use client";

import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import Link from "next/link";
import { Testimonials } from "@/components/testimonials";
import { Philosophy } from "@/components/philosophy";
import { Vision } from "@/components/vision";
import { Community } from "@/components/community";
import { motion } from "framer-motion";
import { Announcement } from "@/components/announcement";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const AnimatedLogo = () => {
  const isMobile = useIsMobile();
  const logoSize = isMobile ? 180 : 300;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-0"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 4, ease: "circOut" },
      }}
    >
        <Image 
            src="/images/Logo.png" 
            alt="Mantra Academy animated logo"
            width={logoSize}
            height={logoSize}
            className="drop-shadow-2xl animate-float-drift"
        />
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
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 celestial-background" />
        
        {/* Logo */}
        <div className="absolute inset-0">
          <AnimatedLogo />
        </div>
        
        {/* Content */}
        <div className="z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="mt-20 mb-4 md:mb-6 text-4xl sm:text-5xl md:text-7xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]"
          >
            Welcome to Mantra Academy
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="max-w-xs sm:max-w-xl md:max-w-3xl mx-auto text-base sm:text-lg md:text-2xl text-foreground/80"
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
        >
          <Philosophy />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Vision />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Announcement />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <FeaturedCourses />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Testimonials />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Community />
        </motion.div>
      </div>
    </div>
  );
}
