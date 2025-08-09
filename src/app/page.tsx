
"use client";

import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import { SocialFeed } from "@/components/social-feed";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Testimonials } from "@/components/testimonials";
import { Philosophy } from "@/components/philosophy";
import { Community } from "@/components/community";
import { motion } from "framer-motion";

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-20 py-12">
      <section className="text-center flex flex-col items-center space-y-8 relative w-full min-h-[70vh] justify-center">
        <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] z-0 mb-8">
           <div className="absolute inset-0 bg-accent/10 rounded-full animate-hero-glow" />
           <div className="absolute inset-8 bg-primary/5 rounded-full animate-hero-glow animation-delay-[-6s]" />
           <div className="absolute inset-0 flex items-center justify-center">
                <Logo className="h-24 w-auto text-primary/80 opacity-80 animate-glow-pulse [animation-delay:-4s] animate-float-drift [&_span]:text-3xl [&_img]:h-24 [&_img]:w-24" />
           </div>
        </div>

        <div className="z-10 flex flex-col items-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]">
              Welcome to Mantra Academy
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80">
              Unlock the power of sound and vibration. Discover ancient mantras and transform your life through our expert-led courses and vibrant community.
            </p>
        </div>
      </section>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="w-full flex justify-center">
        <Philosophy />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="w-full flex justify-center">
        <FeaturedCourses />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="w-full flex justify-center">
        <Testimonials />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="w-full flex justify-center">
        <Community />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="w-full flex justify-center">
        <SocialFeed />
      </motion.div>
    </div>
  );
}
