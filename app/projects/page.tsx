import type { Metadata } from "next";
import { ScrambleHeading } from "../scramble-heading";
import { SiteHeader } from "../site-header";
import { ProjectsList } from "./projects-list";

export const metadata: Metadata = {
  title: "Projects | Sebastian Prusky",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader current="projects" />
      <header className="projects-header" data-page-enter="title">
        <ScrambleHeading id="projects-heading" key="projects-heading" stacked={false}>
          Projects
        </ScrambleHeading>
      </header>
      <ProjectsList />
    </main>
  );
}
