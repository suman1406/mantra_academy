import { Button } from "@/components/ui/button";
import { FeaturedCourses } from "@/components/featured-courses";
import { SocialFeed } from "@/components/social-feed";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 py-12">
      <section className="text-center flex flex-col items-center space-y-6 relative w-full">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl"></div>
           {/* The spinning logo was here */}
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary z-10">
          Welcome to Your Inner Light Sanctuary
        </h1>
        <p className="max-w-2xl text-lg text-foreground/80 z-10">
          Discover tranquility and wisdom. Embark on a journey of self-discovery through our curated courses and a supportive community.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-lg px-8 py-6 group z-10" asChild>
          <Link href="/courses">
            Begin Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>

      <FeaturedCourses />

      <SocialFeed />
    </div>
  );
}
