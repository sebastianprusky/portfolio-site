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
    { name: "home", href: "/" },
    { name: "about me", href: "/about" },
    { name: "projects", href: "/projects" },
    { name: "experience", href: "/experience" },
    { name: "art", href: "/art" },
  ];

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap" rel="stylesheet" />
      </head>
  <body className="text-foreground min-h-screen">
    <div className="w-full">
      <div className="flex justify-center gap-6 mt-5 mb-8">
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
