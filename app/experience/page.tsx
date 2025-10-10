"use client";

import { useState } from "react";

type Experience = {
  logo: string;
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
    title: "University Program Fellow",
    subtitle: "Plug and Play Tech Center",
    duration: "Oct 2025 - Apr 2026",
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
    description: "Partner research for Sensify Analytics; market sizing and competitive analysis for F&B Insights."
  },
  {
    logo: "/mayfest.png",
    title: "Promotions Committee",
    subtitle: "Mayfest Productions",
    duration: "Oct 2024 - Present",
    description: "Promotional campaigns for Dillo Day (dilloday.com)."
  }
];

export default function Experience() {
  // store lists of open indices so multiple can be open simultaneously
  const [openWork, setOpenWork] = useState<number[]>([]);
  const [openCampus, setOpenCampus] = useState<number[]>([]);

  const toggleWork = (index: number) => {
    setOpenWork(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  const toggleCampus = (index: number) => {
    setOpenCampus(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>experience</h1>
      <div className="text-base mb-4 text-center max-w-2xl">a look at my professional experience and campus involvement</div>

      <section className="mb-8 w-full">
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>work</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {workExperiences.map((exp, index) => (
            <li
              key={index}
              className="border rounded p-2.5 shadow flex flex-col gap-1 transition hover:bg-white/40 w-full sm:w-[700px] max-w-2xl mx-auto overflow-hidden box-border"
            >
              <div className="flex items-center gap-4 w-full">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain self-center flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-bold text-lg leading-tight">{exp.title}</p>
                  <p className="leading-tight">{exp.subtitle}</p>
                </div>
                <div className="flex flex-col items-end min-w-fit justify-center">
                  <p className="text-sm whitespace-nowrap leading-tight">{exp.duration}</p>
                  <button
                    onClick={() => toggleWork(index)}
                    aria-label={openWork.includes(index) ? 'Collapse' : 'Expand'}
                    className="ml-2 text-xl focus:outline-none"
                    style={{ minWidth: '2rem', background: 'none', border: 'none', padding: 0 }}
                  >
                    {openWork.includes(index) ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {openWork.includes(index) && (
                <div className="mt-2 border-t pt-2 text-sm break-words whitespace-normal">
                  {exp.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>campus involvement</h2>
        <ul className="space-y-4 flex flex-col items-center">
          {campusExperiences.map((exp, index) => (
            <li
              key={index}
              className="border rounded p-2.5 shadow flex flex-col gap-1 transition hover:bg-white/40 w-full sm:w-[700px] max-w-2xl mx-auto overflow-hidden box-border"
            >
              <div className="flex items-center gap-4 w-full">
                <img src={exp.logo} alt={exp.title + ' logo'} className="w-12 h-12 object-contain self-center flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-bold text-lg leading-tight">{exp.title}</p>
                  <p className="leading-tight">{exp.subtitle}</p>
                </div>
                <div className="flex flex-col items-end min-w-fit justify-center">
                  <p className="text-sm whitespace-nowrap leading-tight">{exp.duration}</p>
                  <button
                    onClick={() => toggleCampus(index)}
                    aria-label={openCampus.includes(index) ? 'Collapse' : 'Expand'}
                    className="ml-2 text-xl focus:outline-none"
                    style={{ minWidth: '2rem', background: 'none', border: 'none', padding: 0 }}
                  >
                    {openCampus.includes(index) ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {openCampus.includes(index) && (
                <div className="mt-2 border-t pt-2 text-sm break-words whitespace-normal">
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