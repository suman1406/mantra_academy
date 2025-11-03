
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo({ className }: { className?: string }) {
  const router = useRouter();

  const handleDoubleClick = () => {
    router.push('/admin/login');
  };

  return (
    <div 
      className={cn("flex items-center gap-1 cursor-pointer group", className)}
      onDoubleClick={handleDoubleClick}
      title="Double-click for admin access"
    >
        <Image src="/images/bh_white.png" alt="Mantra Academy Logo" width={40} height={40} className="group-hover:opacity-80 transition-opacity" />
        <span className="font-headline text-xl font-bold transition-colors whitespace-nowrap tracking-tight">{"Mantra\u00A0Academy"}</span>
    </div>
  );
}
