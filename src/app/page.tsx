
import { FeaturedCourses } from "@/components/featured-courses";
import { Philosophy } from "@/components/philosophy";
import { Vision } from "@/components/vision";
import { Community } from "@/components/community";
// framer-motion is client-only. Avoid using it directly in this server component.
import { Announcement } from "@/components/announcement";
import { AnimatedSection } from "@/components/animated-section";
import { Testimonials } from "@/components/testimonials";
import Image from "next/image";
import { SocialFeed } from "@/components/social-feed";
import { WhatsappPopup } from "@/components/whatsapp-popup";
import { ScrollToTop } from "@/components/scroll-to-top";

import { getAllCourses } from "../services/courseService";
import { getAnnouncements } from "../services/announcementService";

export default async function Home() {
  // Fetch live data from DB on the server and pass to client components
  const [coursesRaw, announcementsRaw] = await Promise.all([getAllCourses(), getAnnouncements()]);

  // Next.js disallows passing objects with toJSON methods (like Mongo ObjectId/Date) directly to client components.
  // Convert to plain JSON-safe objects first.
  const courses = JSON.parse(JSON.stringify(coursesRaw || []));
  const announcements = JSON.parse(JSON.stringify(announcementsRaw || []));

  // Animation wrappers were removed because framer-motion is a client-side lib.
  // If you want entrance animations, wrap these sections in a client component
  // that uses framer-motion.

  return (
    <div className="flex flex-col items-center justify-center">
      <WhatsappPopup />
      <ScrollToTop />
      <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex flex-col items-center justify-center text-center p-4 -mt-16">
        <div className="absolute inset-0 celestial-background" />

        {/* Content: centered semi-transparent card */}
        <div className="z-10 flex flex-col items-center justify-center text-center bg-white/0 backdrop-blur-sm p-6 rounded-2xl">
          <div className="max-w-2xl mx-auto">
              <Image
                src="/images/bh-removebg.png"
                alt="Mantra Academy Logo"
                width={176}
                height={176}
                className="w-36 h-36 md:w-44 md:h-44 object-contain mb-1 mx-auto"
                priority
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[hsl(var(--primary))] text-center">
                Welcome to Mantra Academy
              </h1>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-[hsl(var(--foreground))] max-w-xl">
                Unlock the power of sound and vibration. Discover ancient mantras
                and transform your life through our expert-led courses and vibrant
                community.
              </p>
            </div>
          </div>
      </section>

  <div className="w-full space-y-16 md:space-y-24 py-16 md:py-24">
        <AnimatedSection delay={0}>
          <Philosophy />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Vision />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Announcement announcements={announcements} />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <FeaturedCourses courses={courses} />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Testimonials />
        </AnimatedSection>

    <AnimatedSection delay={0.5}>
      <SocialFeed />
    </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Community />
        </AnimatedSection>
      </div>
    </div>
  );
}
