import { JSX } from "react";

type Experience = {
  role: string;
  company: string;
  duration: string;
};

const experiences: Experience[] = [
  { role: "experience 1", company: "company 1", duration: "duration 1" },
  { role: "experience 2", company: "company 1", duration: "duration 2" },
];

export default function Experience(): JSX.Element {
  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Experience</h1>
      <ul className="space-y-4">
        {experiences.map((exp, index) => (
          <li key={index} className="border rounded p-4 shadow">
            <p className="font-bold">{exp.role}</p>
            <p>{exp.company}</p>
            <p className="text-gray-500">{exp.duration}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
