"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen pt-6">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
