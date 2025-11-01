"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedList({
  children,
  baseDelay = 0,
  step = 0.08,
  duration = 0.6,
}: {
  children: React.ReactNode[];
  baseDelay?: number;
  step?: number;
  duration?: number;
}) {
  return (
    <div>
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration, ease: "easeInOut", delay: baseDelay + i * step }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
