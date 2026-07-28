import type { Metadata } from "next";
import { SiteHeader } from "../site-header";
import { ProjectsList } from "./projects-list";

export const metadata: Metadata = {
  title: "Projects | Sebastian Prusky",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader current="projects" />
      <header className="projects-header">
        <h1>Projects</h1>
      </header>
      <ProjectsList />
    </main>
  );
}
