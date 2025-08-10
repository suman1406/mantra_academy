
import { Instagram, Youtube, Twitter, Facebook, Send } from "lucide-react";
import { Logo } from "./logo";
import { AmbientAudio } from "./ambient-audio";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="z-10 border-t border-border/40 bg-background/95 text-foreground/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="md:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm">
              Reviving the ancient science of mantras for modern seekers. Discover the power of sound to heal, uplift, and transform.
            </p>
            <AmbientAudio />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
             <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Connect With Us</h3>
             <div className="flex space-x-4">
                <a href="https://www.instagram.com/mantr.academy/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Instagram /></a>
                <a href="https://www.youtube.com/@MantrAcademy24" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Youtube /></a>
                <a href="https://x.com/namaste_mantra" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Twitter /></a>
                <a href="https://www.facebook.com/profile.php?id=61566345014729" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary"><Facebook /></a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Join Our Sangha</h3>
            <p className="text-sm mb-3">Receive wisdom, updates, and event invitations directly to your inbox.</p>
            <form className="flex space-x-2">
                <Input type="email" placeholder="Your Email" className="bg-background border-border" />
                <Button type="submit" size="icon" aria-label="Subscribe to newsletter">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
          </div>

        </div>
        <div className="text-center text-sm border-t border-border/40 mt-8 pt-6">
          <p>&copy; {new Date().getFullYear()} Mantra Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
