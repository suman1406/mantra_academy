
"use client"

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Petal = ({ index, totalShapes, radius, petalConfig }: { index: number, totalShapes: number, radius: number, petalConfig: any }) => {
  const angle = (index / totalShapes) * 360;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
        filter: `hue-rotate(${index * 10}deg)`,
        ...petalConfig.style
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
          scale: [0, petalConfig.scale, 1], 
          opacity: [0, 0.8, 0.6]
      }}
      transition={{ 
        duration: petalConfig.duration,
        ease: "easeInOut",
        delay: index * petalConfig.delay + petalConfig.stagger,
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 8
      }}
    >
        <div className={`w-full h-full ${petalConfig.gradient}`} />
    </motion.div>
  );
};


export const AnimatedMandala = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) {
        return <div className="absolute inset-0 bg-accent/10 rounded-full animate-hero-glow" />;
    }

    const layers = [
        { 
            shapes: 8, 
            radius: 80, 
            petalConfig: { 
                style: { width: 80, height: 100, clipPath: 'ellipse(40% 50% at 50% 50%)', originY: '-30px' },
                gradient: 'bg-gradient-to-t from-primary/70 to-accent/50',
                duration: 20,
                delay: 0.2,
                stagger: 0,
                scale: 1.1
            } 
        },
        { 
            shapes: 16, 
            radius: 140, 
            petalConfig: { 
                style: { width: 40, height: 120, clipPath: 'ellipse(35% 50% at 50% 50%)', originY: '-60px' },
                gradient: 'bg-gradient-to-t from-primary/50 to-accent/30',
                duration: 25,
                delay: 0.1,
                stagger: 2,
                scale: 1.05
            } 
        },
        { 
            shapes: 16, 
            radius: 190, 
            petalConfig: { 
                style: { width: 60, height: 80, clipPath: 'ellipse(50% 50% at 50% 50%)', originY: '-100px' },
                gradient: 'bg-gradient-to-t from-primary/30 to-accent/20',
                duration: 30,
                delay: 0.15,
                stagger: 4,
                scale: 1.1
            }
        },
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
                        duration: 60 + layerIndex * 30,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: layerIndex * -10, 
                        repeatType: 'loop',
                    }}
                >
                    {Array.from({ length: layer.shapes }).map((_, i) => (
                        <Petal 
                            key={i} 
                            index={i} 
                            totalShapes={layer.shapes} 
                            radius={layer.radius}
                            petalConfig={layer.petalConfig}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    );
};
