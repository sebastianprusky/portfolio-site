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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
  <body className="text-foreground min-h-screen">
    <div className="w-full">
      <div className="flex justify-center gap-6 mt-8 mb-4">
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
      </div>
      {children}
    </div>
      </body>
    </html>
  );
}
