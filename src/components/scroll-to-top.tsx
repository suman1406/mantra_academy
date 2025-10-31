
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-50"
        >
          <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className="h-14 w-14 rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm transition-opacity hover:bg-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <ArrowUp className="h-7 w-7" />
            <span className="sr-only">Go to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
