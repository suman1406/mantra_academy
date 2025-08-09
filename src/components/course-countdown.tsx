
"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";

export function CourseCountdown() {
  const calculateTimeLeft = () => {
    // Set a target date 10 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);
    targetDate.setHours(19, 0, 0, 0); // 7:00 PM

    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial value
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null; // Or a placeholder
  }
  
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-3xl font-bold text-primary">
          {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase text-muted-foreground">{interval}</span>
      </div>
    );
  });

  return (
    <div>
        <h3 className="text-center font-semibold text-lg mb-2 text-foreground">Course starts in</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
            {timerComponents.length ? timerComponents : <span className="col-span-4">Time's up!</span>}
        </div>
    </div>
  );
}
