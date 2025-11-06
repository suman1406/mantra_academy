
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

// Ensure this server page always fetches live data from the DB (no static cache)
export const dynamic = 'force-dynamic';

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
  <section className="relative w-full h-[80vh] md:h-screen overflow-hidden pt-8 pb-4 px-4 md:-mt-16">
        <div className="absolute inset-0 celestial-background" />

        {/* Content: left text, right Sri Yantra image on md+ */}
        <div className="z-10 mx-auto w-full max-w-6xl bg-white/0 backdrop-blur-sm p-6 rounded-2xl flex items-center h-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="flex flex-col items-start justify-center text-left px-4 md:px-8 pt-6 md:pt-0">
              <Image
                src="/images/bh-removebg.png"
                alt="Mantra Academy Logo"
                width={140}
                height={140}
                className="w-28 h-28 md:w-36 md:h-36 object-contain mb-4"
                priority
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[hsl(var(--primary))]">
                Mantra Academy
              </h1>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-[hsl(var(--foreground))] max-w-xl">
                Unlock the power of sound and vibration. Discover ancient mantras
                and transform your life through our expert-led courses and vibrant
                community.
              </p>
            </div>

            <div className="flex items-center justify-center px-4 md:px-8 mt-8 md:mt-0">
              <div className="relative w-[26rem] h-[26rem] md:w-[44rem] md:h-[44rem] flex items-center justify-center">

                {/* Sri Yantra shifted up (4rem) and moved to the right */}
                <div className="absolute inset-0 flex items-center justify-center -translate-y-16">
                  <Image
                    src="/images/sriyantra.png"
                    alt="Sri Yantra"
                    width={384}
                    height={384}
                    className="object-contain z-0 opacity-55 blur-sm scale-[1.22]"
                    priority
                  />
                </div>

                {/* Namaste overlay — perfectly centered */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="relative w-[92%] h-[92%] md:w-[96%] md:h-[96%]">
                    <Image
                      src="/images/namaste.png"
                      alt="Namaste"
                      fill
                      className="object-contain scale-[1.5] md:scale-[2.05] transition-transform duration-300 z-20"
                      priority
                    />
                  </div>
                </div>

              </div>
            </div>


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
