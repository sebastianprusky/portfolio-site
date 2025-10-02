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
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
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