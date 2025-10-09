"use client";

import React from "react";

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Example Project A",
    subtitle: "Role / Tech",
    description: "Short description always visible."
  },
  {
    title: "Example Project B",
    subtitle: "Role / Tech",
    description: "Another always-visible description."
  }
];

export default function Projects() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Projects
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">A selection of projects</div>

      <section className="mb-8 w-full">
        <ul className="space-y-4 flex flex-col items-center">
          {projects.map((p, idx) => (
            <li
              key={idx}
              className="border rounded p-3 shadow flex gap-4 items-start w-full sm:w-[700px] max-w-2xl mx-auto overflow-hidden box-border"
            >
              {p.image && (
                <img src={p.image} alt={p.title + " image"} className="w-12 h-12 object-contain flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
                {p.subtitle && <p className="text-sm leading-tight">{p.subtitle}</p>}
                <div className="mt-2 text-sm break-words whitespace-normal">{p.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}