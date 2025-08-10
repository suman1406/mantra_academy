
import { Instagram, Youtube, Twitter, Facebook, Send } from "lucide-react";
import { Logo } from "./logo";
import { AmbientAudio } from "./ambient-audio";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21.44 12.22a8.9 8.9 0 0 0-4.66-4.66A9 9 0 1 0 3.56 12.22" />
        <path d="M12 18a6 6 0 0 0 6-6h-6V6a6 6 0 1 0-6 6Z" />
    </svg>
);


export function Footer() {
  return (
    <footer className="z-10 border-t border-primary/20 bg-primary text-primary-foreground/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="md:col-span-1 space-y-4">
            <Logo className="[&>span]:text-primary-foreground" />
            <AmbientAudio />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary-foreground/80 transition-colors">Courses</Link></li>
              <li><Link href="/blog" className="hover:text-primary-foreground/80 transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary-foreground/80 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
             <h3 className="font-headline text-lg font-semibold text-primary-foreground mb-4">Connect With Us</h3>
             <div className="flex space-x-4">
                <a href="https://www.instagram.com/mantr.academy/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground"><Instagram /></a>
                <a href="https://www.youtube.com/@MantrAcademy24" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground"><Youtube /></a>
                <a href="https://x.com/namaste_mantra" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground"><Twitter /></a>
                <a href="https://www.facebook.com/profile.php?id=61566345014729" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground"><Facebook /></a>
            </div>
          </div>
          
          {/* Community */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary-foreground mb-4">Join Our Community</h3>
            <p className="text-sm mb-3">Connect with fellow seekers and get instant updates.</p>
             <Button asChild variant="secondary">
                <Link href="https://whatsapp.com/channel/0029Vb43WtE7T8bcZN2cyX1n" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Join on WhatsApp
                </Link>
            </Button>
          </div>

        </div>
        <div className="text-center text-sm border-t border-primary-foreground/20 mt-8 pt-6">
          <p>&copy; {new Date().getFullYear()} Mantra Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
