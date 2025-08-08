"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const spiritualSymbols = [
    { symbol: 'ॐ', label: 'Aum', className: "text-2xl" },
    { symbol: '✨', label: 'Light Particles', className: "text-sm" },
    { symbol: '☸️', label: 'Dharma Chakra', className: "text-2xl" },
    { symbol: '🔱', label: 'Trishul', className: "text-2xl" },
    { symbol: '🌸', label: 'Lotus', className: "text-2xl" },
    { symbol: '🌀', label: 'Sacred Geometry', className: "text-2xl" }
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
            const newSymbols = Array.from({ length: 40 }).map((_, i) => {
                const spec = spiritualSymbols[i % spiritualSymbols.length];
                const fallDuration = Math.random() * 12 + 8; // 8 to 20 seconds
                const fallDelay = Math.random() * 15; // 0 to 15 seconds delay
                const driftDuration = Math.random() * 6 + 4; // 4 to 10 seconds
                const driftDelay = Math.random() * 5;
                const finalRotate = `${(Math.random() - 0.5) * 720}deg`;
                const driftDistance = `${(Math.random() - 0.5) * 100}px`;


                const style: React.CSSProperties = {
                    left: `${Math.random() * 100}vw`,
                    opacity: 0,
                    '--final-rotate': finalRotate,
                    '--drift-distance': driftDistance,
                    animation: `fall ${fallDuration}s linear ${fallDelay}s infinite, drift ${driftDuration}s ease-in-out ${driftDelay}s infinite`,
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
