
"use client";

import React, { useState } from "react";

type Project = {
  title: string;
  description: string;
};

const projects: Project[] = [
  { title: "Project One", description: "This is my first project." },
  { title: "Project Two", description: "This is my second project." },
];

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Projects</h1>
      <div className="text-base text-gray-600 mb-4 text-center max-w-2xl">A showcase of my favorite technical and creative projects.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:shadow-lg transition w-full max-w-xl mx-auto flex flex-col"
            style={{ minHeight: '5rem' }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-label={openIndex === index ? 'Collapse' : 'Expand'}
                className="ml-2 text-xl focus:outline-none"
                style={{ minWidth: '2rem' }}
              >
                {openIndex === index ? '▲' : '▼'}
              </button>
            </div>
            {openIndex === index && (
              <div className="mt-2 border-t pt-2 text-sm">
                {project.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}