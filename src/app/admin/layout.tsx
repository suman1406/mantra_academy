
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AppProvider } from "@/context/AppDataContext";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
  const resp = await fetch('/api/admin/me', { credentials: 'same-origin' });
        if (!resp.ok) {
          // not authenticated
          if (pathname !== '/admin/login') router.replace('/admin/login');
          setIsAuthenticated(false);
        } else {
          const data = await resp.json();
          setIsAuthenticated(Boolean(data?.authenticated));
        }
      } catch (error) {
        console.error('Auth check failed', error);
        toast({
          variant: 'destructive',
          title: 'Session Error',
          description: 'Could not verify authentication status. Please try again.',
        });
        if (pathname !== '/admin/login') router.replace('/admin/login');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pathname, router, toast]);

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
    );
  }

  // The login page has its own simple layout, so we don't render the admin shell for it.
  if (pathname === '/admin/login') {
      return <AppProvider>{children}</AppProvider>;
  }

  // If we've determined the user is not authenticated and they somehow haven't been redirected yet,
  // show a loading message instead of the broken layout.
  if (!isAuthenticated) {
     return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <AppProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-muted/30 pl-64">
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
