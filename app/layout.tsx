// app/layout.tsx
import React from "react";
import "./globals.css";
import Nav from "./components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body className="text-foreground min-h-screen">
        <Nav />

        {/* fixed, consistent top padding so every page's section header starts the same */}
        <div className="app-content px-4 sm:px-0 w-full min-h-screen overflow-auto pt-10 md:pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
