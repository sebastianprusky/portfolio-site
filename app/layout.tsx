// app/layout.tsx
import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        {/* Global Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-background shadow p-4 flex justify-center gap-6 z-50">
          <a href="/" className="text-sm font-medium hover:underline">Home</a>
          <a href="/about" className="text-sm font-medium hover:underline">About Me</a>
          <a href="/projects" className="text-sm font-medium hover:underline">Projects</a>
          <a href="/experience" className="text-sm font-medium hover:underline">Experience</a>
          <a href="/art" className="text-sm font-medium hover:underline">Art</a>
        </nav>

        {/* Add padding-top so content is not hidden behind navbar */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
