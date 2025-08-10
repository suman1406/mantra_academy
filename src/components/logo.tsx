
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function Logo({ className }: { className?: string }) {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount === 3) {
      router.push('/admin/login');
      setClickCount(0);
    } else {
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1500); 
    }
  };

  return (
    <div 
      className={cn("flex items-center gap-2 cursor-pointer group", className)}
      onClick={handleClick}
      title="Mantra Academy"
    >
        <Image src="/images/Logo.png" alt="Mantra Academy Logo" width={40} height={40} className="group-hover:opacity-80 transition-opacity" />
        <span className="font-headline text-xl font-bold transition-colors">Mantra Academy</span>
    </div>
  );
}
