
"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { AppProvider } from "@/context/AppDataContext";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
