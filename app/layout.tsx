// app/layout.tsx
"use client"; // Needed to use hooks like usePathname
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define navbar items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Art", href: "/art" },
  ];

  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        {/* Global Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-background shadow p-4 flex justify-center gap-6 z-50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium hover:underline ${
                pathname === item.href ? "text-blue-500 underline" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Padding so content is not hidden behind navbar */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
