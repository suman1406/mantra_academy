
"use client";

// This layout is intentionally simple to avoid including the AdminSidebar on the login page.
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
        {children}
    </div>
  );
}
