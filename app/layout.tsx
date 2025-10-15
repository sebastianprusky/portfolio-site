// app/layout.tsx
import React from "react";
import "./globals.css";
import Nav from "./components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/vercel.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap" rel="stylesheet" />
      </head>
      <body className="text-foreground min-h-screen">
        <Nav />
        {/* add top padding so section headers sit below the fixed nav */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
