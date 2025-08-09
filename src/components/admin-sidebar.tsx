
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Users, BookOpen, LogOut, BarChart3, ShieldCheck } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "#", label: "Users", icon: Users },
  { href: "#", label: "Courses", icon: BookOpen },
  { href: "#", label: "Analytics", icon: BarChart3 },
  { href: "#", label: "Settings", icon: Settings },
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
  return (
    <div className="hidden border-r bg-card md:block w-64">
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
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
        </div>
      </div>
    </div>
  );
}
