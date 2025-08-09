
"use client";

import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Noto_Serif_Devanagari } from "next/font/google";

const devanagari = Noto_Serif_Devanagari({
  weight: ["400", "700"],
  subsets: ["devanagari", "latin"],
});

const blogPosts = [
  {
    title: "The Primordial Sound: Unpacking the Meaning of 'Om'",
    author: "Rishi Varma",
    date: "July 26, 2024",
    excerpt:
      "The syllable 'Om' is said to be the primordial sound from which the entire universe emanated. We explore its profound significance and the science of its vibration.",
  },
  {
    title: "Five Mantras to Cultivate Inner Peace",
    author: "Anjali Devi",
    date: "July 20, 2024",
    excerpt:
      "In a world of constant noise, finding tranquility can be a challenge. Here are five powerful, yet simple, mantras to help you cultivate a state of inner peace and calm.",
  },
  {
    title: "The Role of Intention in Mantra Practice",
    author: "Sanjay Rao",
    date: "July 15, 2024",
    excerpt:
      "A mantra is more than just sound; it is an intention given form. Learn how 'sankalpa' (intention) can amplify the effects of your chanting practice exponentially.",
  },
];

const BlogPostCard = ({
  post,
  index,
}: {
  post: typeof blogPosts[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay: index * 0.15 }}
  >
    <Card
      className={`h-full flex flex-col group manuscript-card rounded-none ${devanagari.className}`}
    >
      <CardContent className="flex-grow flex flex-col p-8">
        <CardTitle className="text-2xl md:text-3xl font-bold manuscript-text group-hover:text-card-foreground/80 transition-colors">
          {post.title}
        </CardTitle>
        <div className="text-sm manuscript-subtext mt-2 mb-4">
          By {post.author} on {post.date}
        </div>
        <p className="manuscript-text manuscript-dropcap flex-grow leading-relaxed">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-8 pt-0">
          <Button
            variant="link"
            className="p-0 manuscript-text font-bold text-card-foreground/80 group-hover:text-card-foreground"
          >
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`py-16 sm:py-24 space-y-16 ${devanagari.className}`}
    >
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center"
      >
        <div className="p-4 bg-primary/20 rounded-full inline-block mb-4 border-2 border-primary">
            <BookText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary drop-shadow">
          From the Scribe's Desk
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Exploring the timeless wisdom of sound, consciousness, and the sacred sciences.
        </p>
      </motion.section>

      <section className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-16">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.title} post={post} index={index} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
