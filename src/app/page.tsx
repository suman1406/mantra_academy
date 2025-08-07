import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import { SocialFeed } from "@/components/social-feed";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Testimonials } from "@/components/testimonials";
import { Philosophy } from "@/components/philosophy";
import { Community } from "@/components/community";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 py-12">
      <section className="text-center flex flex-col items-center space-y-8 relative w-full min-h-[70vh] justify-center">
        <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] z-0 mb-8">
           <div className="absolute inset-0 bg-accent/10 rounded-full animate-[hero-glow_8s_ease-in-out_infinite]" />
           <div className="absolute inset-8 bg-primary/5 rounded-full animate-[hero-glow_12s_ease-in-out_infinite_4s]" />
           <div className="absolute inset-0 flex items-center justify-center">
                <Logo className="h-24 w-auto text-primary/80 opacity-80" />
           </div>
        </div>

        <div className="z-10 flex flex-col items-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary drop-shadow-[0_2px_10px_hsla(var(--primary-foreground),0.1)]">
              Welcome to Your Inner Light Sanctuary
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80">
              Discover tranquility and wisdom. Embark on a journey of self-discovery through our curated courses and a supportive community.
            </p>
        </div>
      </section>

      <Philosophy />

      <FeaturedCourses />

      <Testimonials />

      <Community />

      <SocialFeed />
    </div>
  );
}
