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
        {/* keep nav visible on mobile by rendering it as a sibling (fixed positioning inside Nav keeps it on-screen) */}
        <Nav />

        {/* mobile margins (px-4) that disappear at sm+ so desktop unchanged.
            wrapper is scrollable so pages scroll on mobile if content overflows */}
        <div className="px-4 sm:px-0 w-full min-h-screen overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
