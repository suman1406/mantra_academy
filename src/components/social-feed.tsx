
"use client";

import Image from "next/image";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const feedItems = [
  { platform: "Instagram", image: "https://placehold.co/400x400.png", aiHint: "spiritual quote", handle: "@mantr.academy", link: "https://www.instagram.com/mantr.academy/" },
  { platform: "YouTube", image: "https://placehold.co/400x400.png", aiHint: "meditation guide", handle: "@MantraAcademy24", link: "https://www.youtube.com/@MantrAcademy24" },
  { platform: "X", image: "https://placehold.co/400x400.png", aiHint: "yoga pose", handle: "@namaste_mantra", link: "https://x.com/namaste_mantra" },
  { platform: "Facebook", image: "https://placehold.co/400x400.png", aiHint: "mandala art", handle: "Mantra Academy", link: "https://www.facebook.com/profile.php?id=61566345014729" },
];

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 7.184L18.901 1.153Zm-1.61 19.98h2.544L6.03 2.9h-2.7L17.29 21.133Z" />
    </svg>
)

const SocialCard = ({ item, index }: { item: typeof feedItems[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const onMouseLeave = () => {
        if (!cardRef.current || isMobile) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    const Icon = () => {
        const iconProps = { className: "w-10 h-10 md:w-20 md:h-20 text-card-foreground/80 group-hover:text-card-foreground transition-colors duration-300" };
        switch(item.platform) {
            case "Instagram": return <Instagram {...iconProps} />;
            case "YouTube": return <Youtube {...iconProps} />;
            case "X": return <XIcon {...iconProps} />;
            case "Facebook": return <Facebook {...iconProps} />;
            default: return null;
        }
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
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <Card className="overflow-hidden group relative border-border/40 bg-card backdrop-blur-sm aspect-square">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full gap-4 text-center">
                        <Icon />
                        <span className="font-semibold text-sm md:text-lg text-card-foreground">{item.handle}</span>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}

export function SocialFeed() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Connect With Us</h2>
        <p className="text-foreground/80 mt-2 text-base md:text-lg">Follow our journey and get daily inspiration</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {feedItems.map((item, index) => (
            <SocialCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
