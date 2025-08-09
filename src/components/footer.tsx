
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";
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
            <p>&copy; {new Date().getFullYear()} Mantra Academy. All rights reserved.</p>
            <AmbientAudio />
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://www.instagram.com/mantr.academy/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Instagram /></a>
            <a href="https://www.youtube.com/@MantrAcademy24" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Youtube /></a>
            <a href="https://x.com/namaste_mantra" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Twitter /></a>
            <a href="https://www.facebook.com/profile.php?id=61566345014729" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Facebook /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
