
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
      if (isAuthenticated !== "true") {
        toast({
          title: "Access Denied",
          description: "Please log in to view the admin dashboard.",
          variant: "destructive",
        });
        router.replace("/admin/login");
      }
    } catch (error) {
        // This can happen in SSR or if sessionStorage is disabled
        router.replace("/admin/login");
    }
  }, [router, toast]);


  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30">
        {children}
      </main>
    </div>
  );
}
