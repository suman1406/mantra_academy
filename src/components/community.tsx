
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";

const OmIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.5 7.5c0-1.5 1-3.5 3-3.5s3 2 3 3.5-1 3.5-3 3.5-3-2-3-3.5z" />
        <path d="M12.5 7.5c0 1 .5 3-1.5 3.5" />
        <path d="M12 11c-2.5 0-2.5 2-1 3.5s2.5 2.5 4 1.5 1-4-1.5-5" />
        <path d="M8 12h8" />
    </svg>
);

const MandalaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <path d="M12 5v-2" />
        <path d="M12 21v-2" />
        <path d="M5 12h-2" />
        <path d="M21 12h-2" />
        <path d="m16.24 7.76-1.41-1.41" />
        <path d="m9.17 14.83-1.41-1.41" />
        <path d="m7.76 7.76-1.41 1.41" />
        <path d="m14.83 14.83-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8a4 4 0 0 0 -4 4" />
        <path d="M8 12a4 4 0 0 0 4 4" />
        <path d="M12 16a4 4 0 0 0 4 -4" />
        <path d="M16 12a4 4 0 0 0 -4 -4" />
        <circle cx="12" cy="12" r="8" />
    </svg>
);

const SwastikaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 12h8v8" />
        <path d="M12 12v-8h-8" />
        <path d="M12 12v8h8" />
        <path d="M12 12h-8v-8" />
    </svg>
);


const communityFeatures = [
    {
        icon: OmIcon,
        title: "Global Community",
        description: "Connect with like-minded individuals from around the world in our forums and live events.",
    },
    {
        icon: MandalaIcon,
        title: "Exclusive Events",
        description: "Participate in members-only workshops, group meditations, and Q&A sessions with our guides.",
    },
    {
        icon: SwastikaIcon,
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
            <Button size="lg" className="group" asChild>
                <Link href="#">
                    Become a Member
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
        </div>
    </section>
  );
}
