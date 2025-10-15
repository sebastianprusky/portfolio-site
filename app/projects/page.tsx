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
    title: "Sensify Recycling (ISBE Analytics)",
    subtitle: "Strategic analysis + partner research",
    description: "Conducted partner research for Sensify, a sustainability tech startup. I developed an outreach strategy for six auxilary service providers for Sensify to reach out to in order to scale to university campuses."
  },
  {
    title: "F&B Insights (ISBE Analytics; current)",
    subtitle: "Strategic analysis + market sizing",
    description: "Conducting market sizing and providing strategic recommendations for alcoholic beverage POS data company."
  },
  {
    title: "Tail Trail Panel",
    subtitle: "iterative testing + prototyping + design report",
    description: "Designed and built an interactive display case for a Chicago Museum as part of a 10-week engineering project course."
  },
  {
    title: "Portfolio Simulator",
    subtitle: "Excel (VBA Macros)",
    description: "Built an excel dashboard that allows users to compare portfolios over time. The dashboard pulls historical and real-time stock data using Python."
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        projects
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">a collection of projects I&apos;ve worked on</div>

      <section className="mb-8 w-full px-4 sm:px-0">
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