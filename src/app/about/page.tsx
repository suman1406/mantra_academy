
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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

const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
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
     <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ transition: 'transform 0.1s ease-out' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <Card className="text-center border-border/40 bg-card/80 backdrop-blur-sm flex flex-col items-center p-6 h-full">
            <div className="relative w-40 h-40 mb-4">
            <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                data-ai-hint={member.aiHint}
                className="rounded-full object-cover ring-4 ring-offset-4 ring-offset-background ring-accent/50"
            />
            </div>
            <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{member.name}</CardTitle>
            <p className="text-accent font-semibold">{member.role}</p>
            </CardHeader>
            <CardContent>
            <p className="text-foreground/70">{member.bio}</p>
            </CardContent>
        </Card>
    </motion.div>
  )
}

export default function AboutPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
        }
    };

  return (
    <div className="py-12 space-y-20 flex flex-col items-center">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Sacred Mission</h1>
        <div className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          <p>
            At Mantra Academy, our mission is to revive the ancient science of mantras and make it accessible for modern seekers. We believe in the profound power of sound to heal, uplift, and transform consciousness.
          </p>
          <p>
            We are dedicated to providing authentic, in-depth, and practical education on the art and science of mantra chanting. Our vision is a world where every individual can harness the power of sound for personal growth, inner peace, and universal well-being.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Meet Our Instructors</h2>
          <p className="text-foreground/80 mt-2">The guides of Mantra Academy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
