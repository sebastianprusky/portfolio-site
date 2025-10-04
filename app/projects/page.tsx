import { JSX } from "react";

type Project = {
  title: string;
  description: string;
};

const projects: Project[] = [
  { title: "Project One", description: "This is my first project." },
  { title: "Project Two", description: "This is my second project." },
];

export default function Projects(): JSX.Element {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative">
      <h1 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}