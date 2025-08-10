
"use client";

import type { BlogPost } from "@/lib/blog-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { Noto_Serif_Devanagari } from "next/font/google";
import { Calendar, User } from "lucide-react";
import { Badge } from "./ui/badge";

const devanagari = Noto_Serif_Devanagari({
  weight: ["400", "700"],
  subsets: ["devanagari", "latin"],
});

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { title, author, date, content, image, aiHint } = post;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`py-12 sm:py-16 ${devanagari.className}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-primary mb-4"
          >
            {title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center items-center gap-6 text-foreground/70"
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </motion.div>
        </header>

        {/* Manuscript-style content */}
        <div className="manuscript-card p-8 md:p-12 lg:p-16">
          <div className="prose prose-lg lg:prose-xl max-w-none manuscript-text manuscript-dropcap">
            <style jsx global>{`
              .prose h3 {
                color: hsl(var(--card-foreground));
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.75em;
                margin-top: 2em;
                margin-bottom: 1em;
              }
            `}</style>
             <p>{content}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
