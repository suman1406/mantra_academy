"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const spiritualSymbols = [
    { symbol: 'ॐ', label: 'Aum', animation: 'float-rotate', opacity: 0.1, className: "text-2xl" },
    { symbol: '✨', label: 'Light Particles', animation: 'fade-glow', opacity: 0.08, className: "text-sm" },
    { symbol: '☸️', label: 'Dharma Chakra', animation: 'spin-fall', opacity: 0.1, className: "text-2xl" },
    { symbol: '🔱', label: 'Trishul', animation: 'pulse-drop', opacity: 0.09, className: "text-2xl" },
    { symbol: '🌸', label: 'Lotus', animation: 'float-drift', opacity: 0.1, className: "text-2xl" },
    { symbol: '🌀', label: 'Sacred Geometry', animation: 'glow-pulse', opacity: 0.09, className: "text-2xl" }
];


const Symbol = ({ symbol, style, className }: { symbol: string, style: React.CSSProperties; className?: string }) => (
  <div
    className={cn("absolute text-accent/60", className)}
    style={style}
  >
    {symbol}
  </div>
);

export function FallingSymbols() {
    const [symbols, setSymbols] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateSymbols = () => {
            const newSymbols = Array.from({ length: 30 }).map((_, i) => {
                const spec = spiritualSymbols[i % spiritualSymbols.length];
                const animationDuration = Math.random() * 15 + 10;
                const animationDelay = Math.random() * 10;
                
                const style: React.CSSProperties = {
                    left: `${Math.random() * 100}vw`,
                    opacity: spec.opacity,
                    animation: `${spec.animation} ${animationDuration}s linear ${animationDelay}s infinite, glow 5s ease-in-out ${Math.random() * 5}s infinite`,
                    animationFillMode: 'forwards',
                };
                return <Symbol key={i} symbol={spec.symbol} style={style} className={spec.className} />;
            });
            setSymbols(newSymbols);
        };
        generateSymbols();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {symbols}
        </div>
    )
}
