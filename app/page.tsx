import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen px-8 flex flex-col items-center justify-center relative -translate-y-12">
      <h1
        className="text-center text-3xl sm:text-5xl font-bold mb-2 animate-float-up float-delay-100 whitespace-nowrap"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        Sebastian Prusky
      </h1>

      <p className="text-center text-base mb-2 animate-float-up float-delay-200">
        IE + MMSS + CS minor @ Northwestern
      </p>

      <div className="flex gap-6 animate-float-up float-delay-300 justify-center mt-2">
        <a
          href="https://www.linkedin.com/in/your-profile"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-foreground"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.794-1.75-1.732s.784-1.732 1.75-1.732 1.75.794 1.75 1.732-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.5c0-1.381-.028-3.156-1.922-3.156-1.923 0-2.218 1.5-2.218 3.049v5.607h-3v-10h2.882v1.367h.041c.402-.762 1.381-1.565 2.841-1.565 3.041 0 3.602 2.003 3.602 4.605v5.593z" />
          </svg>
        </a>
      </div>
    </main>
  );
}