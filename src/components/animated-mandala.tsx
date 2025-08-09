
"use client"

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Shape = ({ index, totalShapes, radius }: { index: number, totalShapes: number, radius: number }) => {
  const angle = (index / totalShapes) * 360;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-8 h-16 bg-primary/30 rounded-full origin-bottom"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
        filter: `hue-rotate(${index * 15}deg)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [1, 1.1, 1], opacity: 1 }}
      transition={{ 
        duration: 2, 
        ease: "easeInOut",
        delay: index * 0.1 
      }}
    />
  );
};

export const AnimatedMandala = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) {
        return <div className="absolute inset-0 bg-accent/10 rounded-full animate-hero-glow" />;
    }

    const layers = [
        { shapes: 12, radius: 100, duration: 60 },
        { shapes: 8, radius: 150, duration: 90 },
        { shapes: 6, radius: 50, duration: 40 },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-accent/10 rounded-full animate-hero-glow" />
            <div className="absolute inset-8 bg-primary/5 rounded-full animate-hero-glow animation-delay-[-6s]" />

            {layers.map((layer, layerIndex) => (
                 <motion.div
                    key={layerIndex}
                    className="absolute w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: layer.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: layerIndex * 2,
                        repeatType: 'loop',
                    }}
                >
                    {Array.from({ length: layer.shapes }).map((_, i) => (
                        <Shape key={i} index={i} totalShapes={layer.shapes} radius={layer.radius} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
};
