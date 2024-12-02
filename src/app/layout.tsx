import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransactFlow",
  description: "TransactFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`antialiased bg-gradient-to-r from-blue-50 to-blue-100`}
        >
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
