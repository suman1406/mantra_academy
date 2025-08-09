
"use client"

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ index, totalShapes, radius }: { index: number, totalShapes: number, radius: number }) => {
  const angle = (index / totalShapes) * 360;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-12 h-24 origin-bottom"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
        filter: `hue-rotate(${index * 20}deg)`,
        clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
          scale: [0, 1.1, 1], 
          opacity: [0, 0.7, 0.5]
      }}
      transition={{ 
        duration: 2.5, 
        ease: "easeInOut",
        delay: index * 0.1,
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 5
      }}
    >
        <div className="w-full h-full bg-gradient-to-b from-primary/60 to-accent/40" />
    </motion.div>
  );
};

const Star = ({ index, totalShapes, radius, duration }: { index: number, totalShapes: number, radius: number, duration: number }) => {
  const angle = (index / totalShapes) * 360;

  return (
     <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-foreground rounded-full"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 1.5, 1, 0], 
        opacity: [0, 1, 0.5, 1, 0] 
      }}
      transition={{ 
        duration: duration, 
        ease: "linear",
        delay: (duration / totalShapes) * index,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  )
}


export const AnimatedMandala = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) {
        return <div className="absolute inset-0 bg-accent/10 rounded-full animate-hero-glow" />;
    }

    const layers = [
        { component: Petal, shapes: 12, radius: 100, duration: 60 },
        { component: Petal, shapes: 8, radius: 160, duration: 90 },
        { component: Star, shapes: 20, radius: 200, duration: 20 },
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
                        delay: layerIndex * -5, // Stagger layer rotation start
                        repeatType: 'loop',
                    }}
                >
                    {Array.from({ length: layer.shapes }).map((_, i) => (
                        <layer.component 
                            key={i} 
                            index={i} 
                            totalShapes={layer.shapes} 
                            radius={layer.radius}
                            duration={layer.duration}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    );
};
