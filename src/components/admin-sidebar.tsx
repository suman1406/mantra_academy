
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, LogOut, FileText, ShieldCheck, Megaphone, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/instructors", label: "Instructors", icon: Users },
];

const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
  const pathname = usePathname();
  const isActive = pathname === href;


  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-primary/10 text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export function AdminSidebar() {
  const router = useRouter();

  const handleSignOut = () => {
    (async () => {
      try {
        await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
      } catch (err) {
        console.error('Logout request failed:', err);
      } finally {
        router.push('/');
      }
    })();
  };

  return (
    <div className="hidden border-r bg-card md:block fixed top-0 left-0 h-screen w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
           <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl">Admin Panel</span>
            </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
        </div>
         <div className="mt-auto p-4 border-t">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full justify-start"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
        </div>
      </div>
    </div>
  );
}
