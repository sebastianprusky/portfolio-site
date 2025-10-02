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
    logo: "/vercel.svg",
    title: "Software Engineer Intern",
    subtitle: "Tech Corp",
    duration: "Summer 2024",
    description: "Worked on building scalable web applications and collaborated with cross-functional teams to deliver new features."
  },
];

const campusExperiences: Experience[] = [
  {
    logo: "/next.svg",
    title: "Club President",
    subtitle: "Coding Club",
    duration: "2023-2024",
    description: "Led a team of students to organize coding workshops and hackathons, fostering a collaborative learning environment."
  },
];


export default function Experience(): JSX.Element {
  const [openWork, setOpenWork] = useState<number | null>(null);
  const [openCampus, setOpenCampus] = useState<number | null>(null);

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Experience</h1>
      <section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Work</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {workExperiences.map((exp, index) => (
            <li key={index} style={{ height: '75%' }} className="border rounded p-4 shadow flex flex-col gap-2 cursor-pointer transition hover:bg-gray-50 w-1/2 min-w-[250px] max-w-xl mx-auto"
                onClick={() => setOpenWork(openWork === index ? null : index)}>
              <div className="flex items-center gap-4">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain" />
                <div className="flex-1">
                  <p className="font-bold text-lg">{exp.title}</p>
                  <p className="text-gray-700">{exp.subtitle}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                </div>
                <span className="ml-2 text-xl">{openWork === index ? '▲' : '▼'}</span>
              </div>
              {openWork === index && (
                <div className="mt-2 text-gray-600 border-t pt-2 text-sm">
                  {exp.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section>
  <h2 className="text-2xl font-semibold mb-4 text-center">Campus Involvement</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {campusExperiences.map((exp, index) => (
            <li key={index} style={{ height: '75%' }} className="border rounded p-4 shadow flex flex-col gap-2 cursor-pointer transition hover:bg-gray-50 w-1/2 min-w-[250px] max-w-xl mx-auto"
                onClick={() => setOpenCampus(openCampus === index ? null : index)}>
              <div className="flex items-center gap-4">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain" />
                <div className="flex-1">
                  <p className="font-bold text-lg">{exp.title}</p>
                  <p className="text-gray-700">{exp.subtitle}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                </div>
                <span className="ml-2 text-xl">{openCampus === index ? '▲' : '▼'}</span>
              </div>
              {openCampus === index && (
                <div className="mt-2 text-gray-600 border-t pt-2 text-sm">
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
