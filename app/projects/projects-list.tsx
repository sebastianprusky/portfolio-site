"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Project = {
  slug: string;
  title: string;
  shortSubtitle: string;
  previewSrc: string;
  blurb: string;
  releaseNote?: string;
  technologies: string[];
  githubUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
};

const projects: Project[] = [
  {
    slug: "homememory",
    title: "HomeMemory",
    shortSubtitle: "A visual memory for everything you own",
    previewSrc: "/projects/homememory-dark-preview.png",
    blurb:
      "HomeMemory is a searchable, visual memory for your belongings. I began building it at 33Labs, motivated by experiences moving in and out of college dorms. The app combines visual inventory tools with semantic AI-powered search so people can ask questions about what they own, avoid duplicate purchases, and make packing or moving easier.",
    releaseNote:
      "HomeMemory is now available as an unlisted iOS app through a direct App Store link.",
    technologies: ["SwiftUI", "SwiftData", "Firebase"],
    websiteUrl: "https://www.33labs.org/homememory/",
    appStoreUrl: "https://apps.apple.com/us/app/homememory/id6760926658",
  },
  {
    slug: "pickamovie",
    title: "PickAMovie",
    shortSubtitle: "Personalized movie discovery without the endless scroll",
    previewSrc: "/projects/pickamovie-light-preview.png",
    blurb:
      "PickAMovie reduces the friction of choosing what to watch. It uses imported Letterboxd history and in-app preference signals to recommend personalized picks. The project combines semantic search with a swipe-based decision flow to turn endless browsing into a smaller set of relevant choices.",
    technologies: ["React", "Vite", "TypeScript", "Supabase"],
    githubUrl: "https://github.com/sebastianprusky/pickamovie",
  },
  {
    slug: "rank-your-meal-exchanges",
    title: "Northwestern Dining Ranked",
    shortSubtitle: "A faster way to rank Northwestern dining",
    previewSrc: "/projects/rank-your-meal-exchanges-preview.jpg",
    blurb:
      "Northwestern Dining Ranked is a mobile-first, no-login app for Northwestern students to rank campus meal-exchange spots. Inspired by Beli's ranking flow, the app turns individual rankings into an anonymous campus leaderboard.\n\nIndependent project inspired by Beli. Not affiliated with or endorsed by Beli or Northwestern University.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    githubUrl: "https://github.com/sebastianprusky/northwestern-dining-ranked",
    websiteUrl: "https://rank-your-meal-exchanges.vercel.app",
  },
  {
    slug: "hexlearn",
    title: "Hexlearn",
    shortSubtitle: "Personal loss-window forecasting from gameplay",
    previewSrc: "/projects/hexlearn-preview.png",
    blurb:
      "Hexlearn is a local-first ML experiment built around Hextris. It's designed to learn from canvas pixels and test whether a personalized visual model can forecast an upcoming loss window more effectively than simple time-based baselines.",
    technologies: ["Python", "FastAPI", "scikit-learn", "PyTorch", "Next.js", "SQLite"],
    githubUrl: "https://github.com/sebastianprusky/Hexlearn",
  },
];

export function ProjectsList() {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const activeProject = projects.find((project) => project.slug === activeProjectSlug) ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeProject) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }

    if (dialog.open) dialog.close();
    lastActiveElementRef.current?.focus();
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") closeProject();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeProject]);

  function closeProject() {
    setActiveProjectSlug(null);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeProject();
  }

  return (
    <>
      <section className="projects-layout" aria-label="Projects" data-page-enter="content">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <div aria-hidden="true" className="project-card-visual">
              <img alt="" src={project.previewSrc} />
            </div>
            <div className="project-card-overlay">
              <h2>{project.title}</h2>
              <p>{project.shortSubtitle}</p>
              <ul
                aria-label={`${project.title} technologies`}
                className="project-technology-list"
              >
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
            <button
              aria-label={`Open ${project.title} project details`}
              className="project-card-button"
              onClick={() => setActiveProjectSlug(project.slug)}
              type="button"
            />
          </article>
        ))}
      </section>

      <dialog
        aria-labelledby={activeProject ? `${activeProject.slug}-title` : undefined}
        className="project-modal"
        onCancel={closeProject}
        onClose={closeProject}
        onClick={handleBackdropClick}
        ref={dialogRef}
      >
        <article className="project-modal-panel">
          <button
            aria-label={activeProject ? `Close ${activeProject.title} details` : "Close project details"}
            className="project-modal-close"
            onClick={closeProject}
            ref={closeButtonRef}
            type="button"
          >
            Close
          </button>
          <header className="project-modal-header">
            <h2 id={activeProject ? `${activeProject.slug}-title` : undefined}>
              {activeProject?.title}
            </h2>
          </header>
          {activeProject ? (
            <>
              <div className="project-action-links">
                {activeProject.githubUrl ? (
                  <a
                    aria-label={`View ${activeProject.title} on GitHub`}
                    className="project-action-link"
                    href={activeProject.githubUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span aria-hidden="true" className="contact-icon contact-icon-github" />
                    <span>GitHub</span>
                  </a>
                ) : null}
                {activeProject.websiteUrl ? (
                  <a
                    aria-label={`Visit the ${activeProject.title} website`}
                    className="project-action-link"
                    href={activeProject.websiteUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span aria-hidden="true" className="contact-icon contact-icon-website" />
                    <span>Website</span>
                  </a>
                ) : null}
                {activeProject.appStoreUrl ? (
                  <a
                    aria-label={`View ${activeProject.title} on the App Store`}
                    className="project-action-link"
                    href={activeProject.appStoreUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span aria-hidden="true" className="contact-icon contact-icon-app-store" />
                    <span>View on App Store</span>
                  </a>
                ) : null}
              </div>
              <div className="project-modal-story">
                <p className="project-blurb">{activeProject.blurb}</p>
                {activeProject.releaseNote ? (
                  <p className="project-release-note">{activeProject.releaseNote}</p>
                ) : null}
                <ul
                  aria-label={`${activeProject.title} technologies`}
                  className="project-technology-list project-technology-list-modal"
                >
                  {activeProject.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <p className="project-demo-note">Demo coming soon</p>
              </div>
            </>
          ) : null}
        </article>
      </dialog>
    </>
  );
}
