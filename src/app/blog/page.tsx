
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BookText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "The Primordial Sound: Unpacking the Meaning of 'Om'",
    author: "Rishi Varma",
    date: "July 26, 2024",
    excerpt: "The syllable 'Om' is said to be the primordial sound from which the entire universe emanated. We explore its profound significance and the science of its vibration.",
  },
  {
    title: "Five Mantras to Cultivate Inner Peace",
    author: "Anjali Devi",
    date: "July 20, 2024",
    excerpt: "In a world of constant noise, finding tranquility can be a challenge. Here are five powerful, yet simple, mantras to help you cultivate a state of inner peace and calm.",
  },
  {
    title: "The Role of Intention in Mantra Practice",
    author: "Sanjay Rao",
    date: "July 15, 2024",
    excerpt: "A mantra is more than just sound; it is an intention given form. Learn how 'sankalpa' (intention) can amplify the effects of your chanting practice exponentially.",
  },
];

const BlogPostCard = ({ post, index }: { post: typeof blogPosts[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay: index * 0.15 }}
  >
    <Card className="h-full flex flex-col group manuscript-card">
      <CardContent className="flex-grow flex flex-col p-8">
        <CardTitle className="text-2xl md:text-3xl font-headline text-amber-900/90 dark:text-amber-200/90 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <div className="text-sm text-foreground/60 mt-2 mb-4">
          By {post.author} on {post.date}
        </div>
        <p className="text-foreground/70 flex-grow">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-8 pt-0">
          <Button variant="link" className="p-0 text-amber-900/80 dark:text-amber-200/80 group-hover:text-primary font-bold">
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
      className="py-16 sm:py-24 space-y-16"
    >
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center"
      >
        <div className="p-4 bg-primary/20 rounded-full inline-block mb-4">
            <BookText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
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
