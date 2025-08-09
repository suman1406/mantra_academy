
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, Mic, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";

const communityFeatures = [
    {
        icon: Users,
        title: "Global Community",
        description: "Connect with like-minded individuals from around the world in our forums and live events.",
    },
    {
        icon: Calendar,
        title: "Exclusive Events",
        description: "Participate in members-only workshops, group meditations, and Q&A sessions with our guides.",
    },
    {
        icon: Mic,
        title: "Guided Sessions",
        description: "Access a library of guided practices and talks to support your journey, anytime, anywhere.",
    }
]

const CommunityCard = ({ feature, index }: { feature: typeof communityFeatures[0], index: number }) => {
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
            style={{ transition: 'transform 0.2s ease-out' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
        >
            <Card className="p-8 border-border/40 bg-card backdrop-blur-sm flex flex-col items-center text-center h-full text-card-foreground">
                <feature.icon className="h-12 w-12 text-card-foreground mb-4"/>
                <h3 className="text-2xl font-headline text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-card-foreground/70 flex-grow">{feature.description}</p>
            </Card>
        </motion.div>
    )
}

export function Community() {
  return (
    <section className="w-full max-w-6xl">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Join Our Vibrant Community</h2>
            <p className="text-foreground/80 mt-2">Grow and share your journey with others</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
                 <CommunityCard key={index} feature={feature} index={index} />
            ))}
        </div>
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                <Link href="#">
                    Become a Member
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
        </div>
    </section>
  );
}
