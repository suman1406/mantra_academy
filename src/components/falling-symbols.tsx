"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Heart, Star, Sparkles, Sun, Moon } from "lucide-react";

const SYMBOLS = [Heart, Star, Sparkles, Sun, Moon];

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
                const style = {
                    left: `${Math.random() * 100}vw`,
                    animation: `fall ${Math.random() * 10 + 5}s linear ${Math.random() * 5}s infinite`,
                    fontSize: `${Math.random() * 16 + 12}px`,
                };
                return <Symbol key={i} Icon={Icon} style={style} />;
            });
            setSymbols(newSymbols);
        };
        generateSymbols();
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {symbols}
        </div>
    )
}
