
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We can't auto-play audio, so we create the element on client mount.
    // The user must initiate the play action.
    if (!audioRef.current) {
        // NOTE: Replace this with a URL to your actual audio file (e.g., from a CDN or public folder)
        audioRef.current = new Audio("https://www.chosic.com/wp-content/uploads/2021/07/A-Shamanic-Morning.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={togglePlay} className="text-primary-foreground/60 hover:text-primary-foreground">
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Ambient Sound</span>
      </Button>
  );
}
