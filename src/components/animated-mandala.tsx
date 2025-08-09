
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Petal = ({
  index,
  totalPetals,
  radius,
  rotation,
  petalConfig,
}: {
  index: number;
  totalPetals: number;
  radius: number;
  rotation: number;
  petalConfig: any;
}) => {
  const angle = (index / totalPetals) * 360 + rotation;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-${radius}px)`,
        ...petalConfig.style,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.85, 1.05, 0.85],
        opacity: [0, petalConfig.opacity, petalConfig.opacity],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        delay: index * 0.12 + petalConfig.stagger,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      <div
        className={`w-full h-full ${petalConfig.gradient} rounded-full`}
        style={{
          boxShadow: "0 0 20px rgba(255, 223, 150, 0.5)",
        }}
      />
    </motion.div>
  );
};

const LotusParticle = ({ i }: { i: number }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [size, setSize] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 60 + Math.random() * 180;
    setX(Math.cos(angle) * radius);
    setY(Math.sin(angle) * radius);
    setSize(Math.random() * 2 + 1.5);
    setOpacity(Math.random() * 0.4 + 0.2);
  }, []);

  return (
    <motion.div
      className="absolute bg-yellow-200 rounded-full"
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 10px 3px rgba(255,215,0,0.7)",
      }}
      animate={{
        x: [x, x + (Math.random() - 0.5) * 30],
        y: [y, y + (Math.random() - 0.5) * 30],
        opacity: [0, opacity, 0],
      }}
      transition={{
        duration: Math.random() * 12 + 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.25,
      }}
    />
  );
};

export const DivineLotus = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="absolute inset-0" />;

  const layers = [
    {
      petals: 8,
      radius: 35,
      rotation: 22.5,
      petalConfig: {
        style: {
          width: 90,
          height: 130,
          clipPath: "ellipse(40% 50% at 50% 10%)",
        },
        gradient:
          "bg-gradient-to-b from-pink-100/90 via-rose-200/70 to-amber-100/50",
        opacity: 0.85,
        stagger: 0.5,
      },
    },
    {
      petals: 8,
      radius: 65,
      rotation: 0,
      petalConfig: {
        style: {
          width: 110,
          height: 170,
          clipPath: "ellipse(42% 50% at 50% 20%)",
        },
        gradient:
          "bg-gradient-to-b from-pink-200/90 via-rose-300/70 to-amber-200/50",
        opacity: 0.75,
        stagger: 0.15,
      },
    },
    {
      petals: 12,
      radius: 105,
      rotation: 15,
      petalConfig: {
        style: {
          width: 130,
          height: 210,
          clipPath: "ellipse(45% 50% at 50% 30%)",
        },
        gradient:
          "bg-gradient-to-b from-rose-300/80 via-pink-300/60 to-amber-300/40",
        opacity: 0.6,
        stagger: 0.3,
      },
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ethereal aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particles */}
      <div className="absolute w-full h-full">
        {Array.from({ length: 60 }).map((_, i) => (
          <LotusParticle key={i} i={i} />
        ))}
      </div>

      {/* Glowing core */}
      <motion.div
        className="absolute w-14 h-14 bg-yellow-200 rounded-full"
        style={{
          boxShadow:
            "0 0 40px 20px rgba(255, 223, 150, 0.9), 0 0 80px 40px rgba(255, 250, 220, 0.3)",
          filter: "blur(4px)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Petal layers */}
      {layers.map((layer, layerIndex) => (
        <motion.div
          key={layerIndex}
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 150 + layerIndex * 70,
            repeat: Infinity,
            ease: "linear",
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
