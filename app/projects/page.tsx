import type { Metadata } from "next";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "Projects | Sebastian Prusky",
};

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <SiteHeader current="projects" />
      <section className="projects-empty">
        <p>Technology + creative systems</p>
        <h1>Projects</h1>
        <span>Work will be added here.</span>
      </section>
    </main>
  );
}
