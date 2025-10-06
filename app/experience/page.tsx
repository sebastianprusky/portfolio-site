"use client";
import { JSX } from "react";



import React, { useState } from "react";

type Experience = {
  logo: string; // image path
  title: string;
  subtitle: string;
  duration: string;
  description: string;
};

const workExperiences: Experience[] = [
  {
    logo: "/cc.jpeg",
    title: "Mentor",
    subtitle: "Curious Cardinals",
    duration: "Nov 2024 - Present",
    description: "Mentoring K-12 students in math and entrepreneurship at an edtech startup."
  },
  {
    logo: "/p&p.png",
    title: "University Fellow",
    subtitle: "Plug and Play Tech Center",
    duration: "October 2025 - April 2026",
    description: "VC program"
  },
  {
    logo: "/ubs.png",
    title: "Intern",
    subtitle: "UBS International",
    duration: "June 2025 - July 2025",
    description: "Created excel projects to analyze and improve fund selection for wealth management division"
  },
];

const campusExperiences: Experience[] = [
  {
    logo: "/isbe.jpg",
    title: "Analyst",
    subtitle: "ISBE Analytics",
    duration: "April 2025 - Present",
    description: "Partner research for Sensify Analytics (recycling tech startup); Market sizing and competitive analysis for F&B Insights (alcoholic beverage POS data startup)."
  },
  {
    logo: "/mayfest.png",
    title: "Promotions Committee",
    subtitle: "Mayfest Productions",
    duration: "October 2024 - Present",
    description: "Promotional campaigns for Dillo Day (dilloday.com)"
  }
];


export default function Experience(): JSX.Element {
  const [openWork, setOpenWork] = useState<number | null>(null);
  const [openCampus, setOpenCampus] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Experience</h1>
      <div className="text-base mb-4 text-center max-w-2xl">a look at my professional experience and campus involvement</div>
      <section className="mb-8">
  <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Work</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {workExperiences.map((exp, index) => (
            <li key={index} className="border rounded p-2.5 shadow flex flex-col gap-1 transition hover:bg-gray-50 w-full min-w-[250px] max-w-2xl mx-auto">
              <div className="flex items-center gap-4 w-full">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain self-center" />
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-bold text-lg leading-tight">{exp.title}</p>
                  <p className="leading-tight">{exp.subtitle}</p>
                </div>
                <div className="flex flex-col items-end min-w-fit justify-center">
                  <p className="text-sm whitespace-nowrap leading-tight">{exp.duration}</p>
                  <button
                    onClick={() => setOpenWork(openWork === index ? null : index)}
                    aria-label={openWork === index ? 'Collapse' : 'Expand'}
                    className="ml-2 text-xl focus:outline-none"
                    style={{ minWidth: '2rem', background: 'none', border: 'none', padding: 0 }}
                  >
                    {openWork === index ? '▲' : '▼'}
                  </button>
                </div>
              </div>
              {openWork === index && (
                <div className="mt-2 border-t pt-2 text-sm">
                  {exp.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section>
  <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Campus Involvement</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {campusExperiences.map((exp, index) => (
            <li key={index} className="border rounded p-2.5 shadow flex flex-col gap-1 transition hover:bg-gray-50 w-full min-w-[250px] max-w-2xl mx-auto">
              <div className="flex items-center gap-4 w-full">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain self-center" />
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-bold text-lg leading-tight">{exp.title}</p>
                  <p className="leading-tight">{exp.subtitle}</p>
                </div>
                <div className="flex flex-col items-end min-w-fit justify-center">
                  <p className="text-sm whitespace-nowrap leading-tight">{exp.duration}</p>
                  <button
                    onClick={() => setOpenCampus(openCampus === index ? null : index)}
                    aria-label={openCampus === index ? 'Collapse' : 'Expand'}
                    className="ml-2 text-xl focus:outline-none"
                    style={{ minWidth: '2rem', background: 'none', border: 'none', padding: 0 }}
                  >
                    {openCampus === index ? '▲' : '▼'}
                  </button>
                </div>
              </div>
              {openCampus === index && (
                <div className="mt-2 border-t pt-2 text-sm">
                  {exp.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
