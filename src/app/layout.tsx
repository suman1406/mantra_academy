
"use client";

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AIChatbot } from "@/components/ai-chatbot";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { FallingMantras } from "@/components/falling-mantras";

// export const metadata: Metadata = {
//   title: "Mantra Academy",
//   description: "Learn the power of mantras and transform your life.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <title>Mantra Academy</title>
        <meta name="description" content="Learn the power of mantras and transform your life." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased bg-background text-foreground min-h-screen flex flex-col")}>
        {!isAdminPage && <FallingMantras />}
        {!isAdminPage && <Header />}
        <main className={cn(
          "flex-grow",
          !isAdminPage && "container mx-auto px-4"
        )}>
          {children}
        </main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <AIChatbot />}
        <Toaster />
      </body>
    </html>
  );
}
