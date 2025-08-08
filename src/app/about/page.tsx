
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Aria Lightwood",
    role: "Founder & Lead Mystic",
    image: "https://placehold.co/400x400.png",
    aiHint: "spiritual woman portrait",
    bio: "Aria founded the Sanctuary to create a haven for souls seeking light and wisdom.",
  },
  {
    name: "Kaelen Stone",
    role: "Meditation Guide",
    image: "https://placehold.co/400x400.png",
    aiHint: "meditating man portrait",
    bio: "With 20 years of practice, Kaelen guides students to find their inner stillness.",
  },
  {
    name: "Seraphina Moon",
    role: "Yoga Instructor",
    image: "https://placehold.co/400x400.png",
    aiHint: "yoga instructor portrait",
    bio: "Seraphina combines ancient yoga traditions with modern anatomical understanding.",
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
    <div className="py-12 space-y-20">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Sacred Mission</h1>
        <div className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          <p>
            At Inner Light Sanctuary, our mission is to illuminate the path of spiritual discovery for every soul that finds its way to us. We believe in the power of ancient wisdom, the peace of mindful practice, and the strength of a supportive community.
          </p>
          <p>
            We are dedicated to providing authentic, accessible, and transformative experiences that nurture the mind, body, and spirit. Our vision is a world where every individual is connected to their inner light, living a life of purpose, peace, and profound joy.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Meet Our Guides</h2>
          <p className="text-foreground/80 mt-2">The hearts and souls behind the Sanctuary</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
