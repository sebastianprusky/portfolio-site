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

        {/* page content gets top padding to clear the fixed nav.
            smaller padding on very small screens if you want: adjust pt-16/pt-20 */}
        <div className="px-4 sm:px-0 w-full min-h-screen overflow-auto pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
