
"use client";

import { AppProvider } from "@/context/AppDataContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
        <div className="min-h-screen">
            {children}
        </div>
    </AppProvider>
  );
}
