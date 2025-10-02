import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4">Sebastian Prusky</h1>
      <p className="text-lg text-gray-500 text-center">
        IE + MMSS + CS minor @ Northwestern
      </p>
      <div className="flex flex-row gap-6 mt-4">
        <a href="https://github.com/sebastianprusky" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src="/github.svg" alt="GitHub" className="w-8 h-8 hover:opacity-70 transition" />
        </a>
        <a href="https://linkedin.com/in/sebastian-prusky" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="/linkedin.svg" alt="LinkedIn" className="w-8 h-8 hover:opacity-70 transition" />
        </a>
      </div>
    </main>
  );
}