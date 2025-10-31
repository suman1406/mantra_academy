
import { Instagram, Youtube, Facebook, Phone, Mail } from "lucide-react";
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
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.473-.148-.673.15-.197.297-.773.966-.947 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.673-1.611-.923-2.207-.242-.579-.487-.5-.673-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.004a8.71 8.71 0 0 1-4.437-1.211l-.317-.188-3.308.868.884-3.236-.205-.332a8.73 8.73 0 0 1-1.337-4.64c.002-4.833 3.94-8.77 8.773-8.77 2.344 0 4.544.915 6.199 2.571a8.732 8.732 0 0 1 2.573 6.206c-.003 4.833-3.941 8.77-8.771 8.77m7.431-16.201A10.449 10.449 0 0 0 12.05 1.5c-5.79 0-10.51 4.717-10.512 10.507 0 1.85.482 3.646 1.399 5.23L1.5 22.5l5.405-1.42a10.48 10.48 0 0 0 5.052 1.287h.005c5.79 0 10.509-4.717 10.511-10.507a10.446 10.446 0 0 0-3.066-7.362z" />
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
          <div className="md:col-span-2 space-y-4">
            <Logo className="[&>span]:text-primary-foreground" />
             <p className="text-sm max-w-md">
              Unlock the power of sound and vibration. Discover ancient mantras and transform your life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary-foreground transition-colors">Courses</Link></li>
              <li><Link href="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Connect With Us */}
          <div>
             <h3 className="font-headline text-lg font-semibold text-primary-foreground mb-4">Connect With Us</h3>
             <div className="flex space-x-4 mb-4">
                <a href="https://www.instagram.com/mantr.academy/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground"><Instagram /></a>
                <a href="https://www.youtube.com/@MantrAcademy24" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground"><Youtube /></a>
                <a href="https://x.com/namaste_mantra" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground"><XIcon className="h-6 w-6" /></a>
                <a href="https://www.facebook.com/profile.php?id=61566345014729" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground"><Facebook /></a>
            </div>
            <div className="space-y-3 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <a href="tel:+919108787550" className="hover:text-primary-foreground transition-colors">+91 91087 87550</a>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <a href="mailto:namaste.mantracademy@gmail.com" className="hover:text-primary-foreground transition-colors break-all">namaste.mantracademy@gmail.com</a>
                </div>
                 <div className="pt-2">
                     <Button asChild variant="secondary" size="sm">
                        <Link href="https://whatsapp.com/channel/0029Vb43WtE7T8bcZN2cyX1n" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="mr-2 h-4 w-4" />
                            Join on WhatsApp
                        </Link>
                    </Button>
                </div>
            </div>
          </div>

        </div>
        <div className="text-center text-sm border-t border-primary-foreground/20 mt-8 pt-6">
          <p>&copy; {new Date().getFullYear()} Mantra Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
