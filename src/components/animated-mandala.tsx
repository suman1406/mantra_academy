
"use client"

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Petal = ({ index, totalPetals, radius, rotation, petalConfig }: { index: number; totalPetals: number; radius: number; rotation: number, petalConfig: any }) => {
  const angle = (index / totalPetals) * 360 + rotation;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
        ...petalConfig.style,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.1, 1],
        opacity: [0, petalConfig.opacity, petalConfig.opacity],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        delay: index * 0.1 + petalConfig.stagger,
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 4,
      }}
    >
      <div className={`w-full h-full ${petalConfig.gradient} rounded-full`} />
    </motion.div>
  );
};

const LotusParticle = ({ i }: { i: number }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [size, setSize] = useState(0);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const resetParticle = () => {
            const angle = Math.random() * 360;
            const radius = 50 + Math.random() * 200;
            setX(Math.cos(angle) * radius);
            setY(Math.sin(angle) * radius);
            setSize(Math.random() * 3 + 1);
            setOpacity(Math.random() * 0.5 + 0.2);
        };
        resetParticle();
    }, []);

    return (
        <motion.div
            className="absolute bg-amber-200 rounded-full"
            style={{
                width: size,
                height: size,
                boxShadow: '0 0 8px 2px #FFD700',
            }}
            animate={{
                x: [x, x + (Math.random() - 0.5) * 40],
                y: [y, y + (Math.random() - 0.5) * 40],
                opacity: [0, opacity, 0],
            }}
            transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: i * 0.2,
            }}
        />
    );
};

export const AnimatedMandala = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <div className="absolute inset-0 rounded-full" />;
  }

  const layers = [
    {
      petals: 8,
      radius: 30,
      rotation: 22.5,
      petalConfig: {
        style: { width: 80, height: 120, clipPath: 'ellipse(35% 50% at 50% 10%)' },
        gradient: 'bg-gradient-to-b from-amber-100/80 via-amber-200/60 to-pink-200/40',
        opacity: 0.8,
        stagger: 0.5,
      },
    },
    {
      petals: 8,
      radius: 60,
      rotation: 0,
      petalConfig: {
        style: { width: 100, height: 160, clipPath: 'ellipse(40% 50% at 50% 20%)' },
        gradient: 'bg-gradient-to-b from-amber-200/90 via-amber-300/70 to-pink-200/50',
        opacity: 0.7,
        stagger: 0,
      },
    },
     {
      petals: 12,
      radius: 100,
      rotation: 15,
      petalConfig: {
        style: { width: 120, height: 200, clipPath: 'ellipse(45% 50% at 50% 30%)' },
        gradient: 'bg-gradient-to-b from-amber-300/80 via-amber-400/60 to-pink-300/40',
        opacity: 0.5,
        stagger: 0.2,
      },
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
       <div className="absolute w-full h-full">
         {Array.from({ length: 50 }).map((_, i) => (
           <LotusParticle key={i} i={i} />
         ))}
       </div>

      <motion.div
        className="absolute w-12 h-12 bg-amber-300 rounded-full"
        style={{
            boxShadow: '0 0 30px 15px #FFD700, 0 0 50px 30px #F8F3E320',
            filter: 'blur(5px)',
        }}
         animate={{ scale: [1, 1.1, 1] }}
         transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />


      {layers.map((layer, layerIndex) => (
        <motion.div
          key={layerIndex}
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 120 + layerIndex * 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: layer.petals }).map((_, i) => (
            <Petal
              key={i}
              index={i}
              totalPetals={layer.petals}
              radius={layer.radius}
              rotation={layer.rotation}
              petalConfig={layer.petalConfig}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};
