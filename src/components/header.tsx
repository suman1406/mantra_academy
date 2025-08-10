
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "text-lg font-medium transition-colors hover:text-primary-foreground/80",
        pathname === href ? "text-primary-foreground" : "text-primary-foreground/60",
        className
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-primary/20 bg-primary shadow-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-auto">
          <Link href="/">
            <Logo className="[&>span]:text-2xl [&>span]:text-primary-foreground [&>span]:hover:text-primary-foreground" />
            <span className="sr-only">Mantra Academy Home</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary text-primary-foreground border-l-primary/20">
                 <div className="flex justify-center my-8">
                   <Logo className="[&>span]:text-primary-foreground [&>span]:hover:text-primary-foreground/80" />
                 </div>
                <div className="flex flex-col items-center space-y-6 pt-10">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} className="text-2xl" />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
