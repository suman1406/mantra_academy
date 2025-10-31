
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AppProvider } from "@/context/AppDataContext";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem("isAdminAuthenticated") === "true";
      setIsAuthenticated(authStatus);

      if (!authStatus) {
        router.replace('/admin/login');
      }
    } catch (error) {
      // This can happen if sessionStorage is not available (e.g., in SSR or private browsing)
      console.error("Could not access session storage:", error);
      toast({
        variant: "destructive",
        title: "Session Error",
        description: "Could not verify authentication status. Please enable browser storage.",
      });
      router.replace('/admin/login');
    }
  }, [router, toast]);

  if (!isAuthenticated) {
    // Render a loading state or nothing while redirecting
    return (
        <AppProvider>
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p>Redirecting to login...</p>
            </div>
        </AppProvider>
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
