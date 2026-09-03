import type { Metadata } from "next";
import { SiteHeader } from "../site-header";
import { socialImage } from "../site-metadata";
import { ProjectsList } from "./projects-list";

const title = "Projects | Sebastian Prusky";
const description =
  "Selected engineering and product projects by Sebastian Prusky, including HomeMemory, PickAMovie, Northwestern Dining Ranked, and Hexlearn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/projects",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage.url],
  },
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader current="projects" />
      <header className="projects-header" data-page-enter="title">
        <h1 id="projects-heading">Projects</h1>
      </header>
      <ProjectsList />
    </main>
  );
}
