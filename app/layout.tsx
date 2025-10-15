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
        {/* fixed nav stays visible; content is pushed down so nav does not overlap */}
        <Nav />

        {/* increase top padding on larger screens so section headers start lower */}
        <div className="px-4 sm:px-0 w-full min-h-screen overflow-auto pt-20 md:pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
