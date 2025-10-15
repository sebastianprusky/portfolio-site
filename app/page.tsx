import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen px-8 flex flex-col items-center justify-center relative transform -translate-y-8">
      <h1
        // centered and responsive: smaller on mobile so it stays one line
        className="text-center text-3xl sm:text-5xl font-bold mb-2 animate-float-up float-delay-100 whitespace-nowrap"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        Sebastian Prusky
      </h1>
    </main>
  );
}