
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, BookOpen, Target } from "lucide-react";

const teamMembers = [
  {
    name: "Rishi Varma",
    role: "Founder & Lead Instructor",
    image: "https://placehold.co/400x400.png",
    aiHint: "spiritual man portrait",
    bio: "Rishi founded Mantra Academy to share the transformative power of ancient sound.",
  },
  {
    name: "Anjali Devi",
    role: "Vedic Chanting Expert",
    image: "https://placehold.co/400x400.png",
    aiHint: "chanting woman portrait",
    bio: "With a lineage of scholars, Anjali teaches the precise science of Vedic chanting.",
  },
  {
    name: "Sanjay Rao",
    role: "Nada Yoga Teacher",
    image: "https://placehold.co/400x400.png",
    aiHint: "yoga instructor portrait",
    bio: "Sanjay helps students connect with their inner sound through Nada Yoga.",
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="w-full"
    >
        <Card className="text-center border-border/40 bg-card/80 backdrop-blur-sm flex flex-col items-center p-6 h-full group hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-500">
            <div className="relative w-40 h-40 mb-4">
                <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    data-ai-hint={member.aiHint}
                    className="rounded-full object-cover ring-4 ring-offset-4 ring-offset-background ring-accent/50 group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <CardHeader className="p-2">
                <CardTitle className="font-headline text-2xl text-primary">{member.name}</CardTitle>
                <p className="text-accent font-semibold">{member.role}</p>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/70">{member.bio}</p>
            </CardContent>
        </Card>
    </motion.div>
  );
};

export default function AboutPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number = 1) => ({ 
            opacity: 1, 
            y: 0,
            transition: {
                staggerChildren: 0.2,
                delayChildren: i * 0.1,
                duration: 0.8,
                ease: "easeInOut"
            }
        })
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

  return (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="py-16 sm:py-24 space-y-24"
    >
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Sacred Mission</motion.h1>
        <motion.p variants={itemVariants} className="mt-6 text-lg text-foreground/80">
            At Mantra Academy, we are dedicated to reviving the ancient science of mantras and making it accessible for modern seekers. We believe in the profound power of sound to heal, uplift, and transform consciousness.
        </motion.p>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center"
      >
          <motion.div variants={itemVariants}>
              <Card className="p-8 border-border/40 bg-card/80 backdrop-blur-sm h-full">
                  <BookOpen className="h-12 w-12 mx-auto text-accent mb-4"/>
                  <h3 className="text-2xl font-headline text-primary mb-2">Authentic Teachings</h3>
                  <p className="text-foreground/70">
                    Our curriculum is rooted in the timeless wisdom of the Vedas and Tantras, adapted for the modern world.
                  </p>
              </Card>
          </motion.div>
           <motion.div variants={itemVariants}>
              <Card className="p-8 border-border/40 bg-card/80 backdrop-blur-sm h-full">
                  <Target className="h-12 w-12 mx-auto text-accent mb-4"/>
                  <h3 className="text-2xl font-headline text-primary mb-2">Our Vision</h3>
                  <p className="text-foreground/70">
                    We envision a world where every individual can harness sound for personal growth, inner peace, and universal well-being.
                  </p>
              </Card>
          </motion.div>
           <motion.div variants={itemVariants}>
              <Card className="p-8 border-border/40 bg-card/80 backdrop-blur-sm h-full">
                  <Users className="h-12 w-12 mx-auto text-accent mb-4"/>
                  <h3 className="text-2xl font-headline text-primary mb-2">For Everyone</h3>
                  <p className="text-foreground/70">
                    We provide practical education on the art and science of mantra chanting for seekers at all levels of their journey.
                  </p>
              </Card>
          </motion.div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Meet Our Instructors</h2>
          <p className="text-foreground/80 mt-2">The dedicated guides of Mantra Academy</p>
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
