import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen px-8 flex flex-col items-center justify-center relative transform -translate-y-8">
      <h1
        className="text-center text-3xl sm:text-5xl font-bold mb-2 animate-float-up float-delay-100 whitespace-nowrap"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        Sebastian Prusky
      </h1>

      {/* subtitle re-added */}
      <p className="text-center text-base mb-2 animate-float-up float-delay-200">
        IE + MMSS + CS minor @ Northwestern
      </p>

      {/* LinkedIn icon only, centered */}
      <div className="flex flex-row gap-6 animate-float-up float-delay-300 justify-center">
        <a
          href="https://www.linkedin.com/in/your-profile"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* ...existing LinkedIn SVG/icon markup... */}
        </a>
      </div>
    </main>
  );
}