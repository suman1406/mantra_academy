import { Instagram, Youtube, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { AmbientAudio } from "./ambient-audio";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>
          <div className="text-center text-foreground/60">
            <p>&copy; {new Date().getFullYear()} Inner Light Sanctuary. All rights reserved.</p>
            <AmbientAudio />
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-foreground/60 hover:text-primary"><Instagram /></a>
            <a href="#" className="text-foreground/60 hover:text-primary"><Youtube /></a>
            <a href="#" className="text-foreground/60 hover:text-primary"><Twitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
