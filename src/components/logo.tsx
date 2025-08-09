import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image src="/logo.svg" alt="Mantra Academy Logo" width={40} height={40} className="h-8 w-auto" />
        <span className="font-headline text-xl font-bold text-primary">Mantra Academy</span>
    </div>
  );
}
