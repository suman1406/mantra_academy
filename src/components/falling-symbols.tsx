"use client";

import React, { useEffect, useState } from "react";

// SVG components for spiritual symbols
const Mandala = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="30" />
        <path d="M50 10 V 90 M10 50 H 90" />
        <path d="M21.7 21.7 L 78.3 78.3 M21.7 78.3 L 78.3 21.7" />
        <g transform="translate(50,50)">
            <g>
                <path d="M0 -35 A 35 35 0 0 1 35 0" />
                <path d="M0 -35 A 35 35 0 0 0 -35 0" />
            </g>
            <g transform="rotate(90)">
                <path d="M0 -35 A 35 35 0 0 1 35 0" />
                <path d="M0 -35 A 35 35 0 0 0 -35 0" />
            </g>
            <g transform="rotate(180)">
                <path d="M0 -35 A 35 35 0 0 1 35 0" />
                <path d="M0 -35 A 35 35 0 0 0 -35 0" />
            </g>
            <g transform="rotate(270)">
                <path d="M0 -35 A 35 35 0 0 1 35 0" />
                <path d="M0 -35 A 35 35 0 0 0 -35 0" />
            </g>
        </g>
    </svg>
);

const Aum = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" fill="currentColor">
        <path d="M68.8,38.2c-1.2-0.5-2.5-0.8-3.8-0.8c-4.3,0-7.9,3.5-7.9,7.9c0,2.9,1.6,5.5,4,6.9c-2.3,4-6.3,6.8-10.9,7.6   c-0.2,0-0.4,0-0.6,0c-1.8,0-3.6-0.3-5.3-0.8l-1.4,5.4c2.1,0.6,4.3,0.9,6.5,0.9c0.2,0,0.5,0,0.7,0c6.6-0.2,12.3-3.6,16.4-8.9   c1.1,0.3,2.2,0.4,3.3,0.4c6.9,0,12.5-5.6,12.5-12.5C81.3,43.8,75.7,38.2,68.8,38.2z M70.6,48.4c-2.5,0-4.6-2.1-4.6-4.6   c0-2.5,2.1-4.6,4.6-4.6c2.5,0,4.6,2.1,4.6,4.6C75.2,46.3,73.1,48.4,70.6,48.4z" />
        <path d="M41.7,20.8c-10.2,0-18.4,8.3-18.4,18.4c0,10.2,8.3,18.4,18.4,18.4c3.4,0,6.6-0.9,9.4-2.6l-3.3-8.1   c-1.8,0.8-3.8,1.3-5.9,1.3c-4.9,0-8.9-4-8.9-8.9s4-8.9,8.9-8.9c2.7,0,5.2,1.2,6.9,3.2c-2.3,1.4-3.8,3.9-3.8,6.8   c0,4.6,3.7,8.3,8.3,8.3h0.5c0.2,0,0.3,0,0.5,0v-9.5C53,28.6,47.9,20.8,41.7,20.8z" />
    </svg>
);

const Sparkle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.35 6.94L22 10l-5.94 4.54L18.7 22 12 17.31 5.3 22l2.64-7.46L2 10l7.65.06z"/>
    </svg>
);

const DharmaChakra = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v20M2 12h20M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" />
  </svg>
);

const Lotus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0"/>
      <path d="M12 4.1C7.64 4.1 4.1 7.64 4.1 12S7.64 19.9 12 19.9s7.9-3.54 7.9-7.9c0-1.84-.63-3.53-1.69-4.89C16.89 5.8 14.59 4.1 12 4.1zm0 14.2c-3.47 0-6.3-2.83-6.3-6.3s2.83-6.3 6.3-6.3 6.3 2.83 6.3 6.3-2.83 6.3-6.3 6.3z"/>
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm2.93 5.93c-.4.4-1.05.4-1.45 0l-1.48-1.48-1.48 1.48c-.4.4-1.05.4-1.45 0-.4-.4-.4-1.05 0-1.45l1.48-1.48-1.48-1.48c-.4-.4-.4-1.05 0-1.45s1.05-.4 1.45 0l1.48 1.48 1.48-1.48c.4-.4 1.05-.4 1.45 0s.4 1.05 0 1.45l-1.48 1.48 1.48 1.48c.4.4.4 1.05 0 1.45z"/>
  </svg>
);

const Trishul = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V5" />
        <path d="M5 5h14" />
        <path d="M5 5a7 7 0 0 1 7-3 7 7 0 0 1 7 3" />
        <path d="M12 5c-2 3-2 5 0 8" />
        <path d="M12 5c2 3 2 5 0 8" />
    </svg>
);

const SYMBOLS = [Mandala, Aum, Sparkle, DharmaChakra, Lotus, Trishul];

const Symbol = ({ Icon, style }: { Icon: React.ElementType; style: React.CSSProperties }) => (
  <Icon
    className="absolute text-accent/30"
    style={style}
  />
);

export function FallingSymbols() {
    const [symbols, setSymbols] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateSymbols = () => {
            const newSymbols = Array.from({ length: 25 }).map((_, i) => {
                const Icon = SYMBOLS[i % SYMBOLS.length];
                const animationDuration = Math.random() * 10 + 8; // Slower falling
                const glowDuration = Math.random() * 4 + 3;

                const style = {
                    left: `${Math.random() * 100}vw`,
                    animation: `fall ${animationDuration}s linear ${Math.random() * 8}s infinite, glow ${glowDuration}s ease-in-out ${Math.random() * 3}s infinite`,
                    fontSize: `${Math.random() * 20 + 15}px`, // Slightly larger
                    width: '1em',
                    height: '1em',
                };
                return <Symbol key={i} Icon={Icon} style={style} />;
            });
            setSymbols(newSymbols);
        };
        generateSymbols();
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {symbols}
        </div>
    )
}
