
import { Instagram, Youtube, Facebook } from "lucide-react";
import { Logo } from "./logo";
import { AmbientAudio } from "./ambient-audio";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-.758-.372-1.03-.46-.272-.088-.48-.149-.682.149-.199.297-.682.836-.83.983-.149.149-.297.168-.544.02-.247-.149-1.029-.372-1.956-1.213-.728-.659-1.213-1.474-1.362-1.721-.149-.247-.018-.382.13-.51.13-.11.297-.297.446-.446.149-.149.199-.247.297-.415.099-.168.05-.317-.02-.465-.07-.149-.682-1.65-.93-2.267-.247-.616-.495-.519-.682-.51-.187-.008-.396-.008-.604-.008s-.495.07-.742.34c-.247.272-.978.93-.978 2.267 0 1.336 1.002 2.618 1.15 2.796.149.178 1.956 3.018 4.743 4.225.616.272 1.103.416 1.474.51.57.149 1.087.12 1.503-.06.465-.187 1.425-1.161 1.623-1.425.199-.264.199-.495.149-.643-.05-.149-.199-.247-.446-.394zM12 2.05A9.95 9.95 0 0 0 2.05 12a9.95 9.95 0 0 0 9.95 9.95A9.95 9.95 0 0 0 21.95 12 9.95 9.95 0 0 0 12 2.05zm0 18.003c-4.446 0-8.053-3.607-8.053-8.053 0-4.446 3.607-8.053 8.053-8.053 4.446 0 8.053 3.607 8.053 8.053 0 4.446-3.607 8.053-8.053 8.053z" />
    </svg>
);


const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 7.184L18.901 1.153Zm-1.61 19.98h2.544L6.03 2.9h-2.7L17.29 21.133Z" />
    </svg>
)

export function Footer() {
  return (
    <footer className="z-10 border-t border-primary-foreground/20 bg-primary text-primary-foreground/80">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="md:col-span-1 space-y-4">
            <Logo className="[&>span]:text-primary-foreground" />
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
                <a href="https://x.com/namaste_mantra" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground"><XIcon className="h-6 w-6" /></a>
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
