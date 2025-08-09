"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";

export function Announcement() {
  return (
    <section className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Card className="border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden md:grid md:grid-cols-12 items-center group p-8 shadow-lg hover:shadow-primary/20 transition-shadow duration-500">
          <div className="md:col-span-1 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="p-4 bg-primary/20 rounded-full">
              <Megaphone className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="md:col-span-8 text-center md:text-left">
            <h2 className="text-2xl font-headline font-bold text-primary">
              New Workshop: The Healing Power of Sound
            </h2>
            <p className="text-foreground/80 mt-2">
              Join us for a transformative 3-day live workshop with Rishi Varma. Limited spots available.
            </p>
          </div>
          <div className="md:col-span-3 flex justify-center md:justify-end mt-6 md:mt-0">
            <Button variant="outline" className="w-full md:w-auto group transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                <Link href="#">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
