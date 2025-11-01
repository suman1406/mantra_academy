"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

export default function ProgressBar({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, Math.round(percent || 0)));
  return (
    <div className={cn("w-48 bg-muted h-2 rounded overflow-hidden")}>
      <div className="h-2 rounded bg-primary transition-all" style={{ width: `${p}%` }} />
    </div>
  );
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
