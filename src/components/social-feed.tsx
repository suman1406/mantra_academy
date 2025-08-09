
"use client";

import Image from "next/image";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const feedItems = [
  { platform: "Instagram", image: "https://placehold.co/400x400.png", aiHint: "spiritual quote", handle: "@mantr.academy", link: "https://www.instagram.com/mantr.academy/" },
  { platform: "YouTube", image: "https://placehold.co/400x400.png", aiHint: "meditation guide", handle: "@MantraAcademy24", link: "https://www.youtube.com/@MantrAcademy24" },
  { platform: "X", image: "https://placehold.co/400x400.png", aiHint: "yoga pose", handle: "@namaste_mantra", link: "https://x.com/namaste_mantra" },
  { platform: "Facebook", image: "https://placehold.co/400x400.png", aiHint: "mandala art", handle: "Mantra Academy", link: "https://www.facebook.com/profile.php?id=61566345014729" },
];

const SocialCard = ({ item, index }: { item: typeof feedItems[0], index: number }) => {
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

    const Icon = () => {
        switch(item.platform) {
            case "Instagram": return <Instagram />;
            case "YouTube": return <Youtube />;
            case "X": return <Twitter />;
            case "Facebook": return <Facebook />;
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
                <Card className="overflow-hidden group relative border-border/40 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                    <div className="overflow-hidden">
                        <Image src={item.image} alt="Social media post" width={400} height={400} className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2">
                        <Icon />
                        <span className="font-semibold">{item.handle}</span>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}

export function SocialFeed() {
  return (
    <section className="w-full max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Connect With Us</h2>
        <p className="text-foreground/80 mt-2">Follow our journey and get daily inspiration</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedItems.map((item, index) => (
            <SocialCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
