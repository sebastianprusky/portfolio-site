import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
  <main className="min-h-screen mt-4 px-8 flex flex-col items-center justify-center">
  <h1 className="text-5xl font-bold mb-20" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Sebastian Prusky</h1>
      <p className="text-lg text-center">
        IE + MMSS + CS minor @ Northwestern
      </p>
      <div className="flex flex-row gap-6 mt-4">
        <a href="https://github.com/sebastianprusky" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground hover:opacity-70 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </a>
        <a href="https://linkedin.com/in/sebastian-prusky" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:opacity-70 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
          </svg>
        </a>
      </div>
    </main>
  );
}