"use client";

import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ResponsiveImage from "@/components/ui/responsive-image";
import { motion } from "framer-motion";
import { formatDateISO } from "@/lib/formatDate";

export default function BlogListClient({ posts }: { posts: any[] }) {
  return (
    <div className="py-12 sm:py-16 md:py-24">
      <section className="text-center flex flex-col items-center px-4 mb-4">
        <div className="p-4 bg-primary/20 rounded-full inline-block mb-4 border-2 border-primary">
            <BookText className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-primary drop-shadow">From the Scribe's Desk</h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-foreground/80">
          Exploring the timeless wisdom of sound, consciousness, and the sacred sciences.
        </p>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className={`h-full flex flex-col md:flex-row group manuscript-card rounded-none overflow-hidden`}>
                <div className="relative md:w-1/3 w-full h-56 md:h-auto min-h-[250px]">
                   <ResponsiveImage image={post.image} alt={post.title} className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <CardContent className="flex-grow flex flex-col p-6 md:p-8">
                    <CardTitle className="text-xl md:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="text-sm manuscript-subtext mt-2 mb-4">
                      By {post.author} on {formatDateISO(post.date, 'en-GB', { dateStyle: 'medium' })}
                    </div>
                    <p className="manuscript-text manuscript-dropcap flex-grow leading-relaxed text-base">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 md:p-8 pt-0">
                      <Button
                        variant="link"
                        asChild
                        className="p-0 manuscript-text font-bold text-card-foreground/80 group-hover:text-card-foreground"
                      >
                        <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
