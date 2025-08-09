
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    let isAuthenticated = false;
    try {
      isAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true";
    } catch (error) {
      // sessionStorage is not available
    }

    if (!isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please log in to view the admin dashboard.",
        variant: "destructive",
      });
      router.replace("/admin/login");
    }
  }, [router, toast, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 ml-64">
        {children}
      </main>
    </div>
  );
}
