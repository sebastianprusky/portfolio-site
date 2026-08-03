"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

type ProjectSectionKey = "briefDescription" | "inspiration" | "goals" | "tools";

const projectSections: Array<{ key: ProjectSectionKey; label: string }> = [
  { key: "briefDescription", label: "Brief description" },
  { key: "inspiration", label: "Inspiration" },
  { key: "goals", label: "Goal" },
  { key: "tools", label: "Tools / Software" },
];

type Project = {
  slug: string;
  title: string;
  previewSrc: string;
  briefDescription: string;
  inspiration: string;
  goals: string;
  tools: string;
  liveUrl: string | null;
  liveLabel?: string;
};

const projects: Project[] = [
  {
    slug: "betterboxd",
    title: "Betterboxd",
    previewSrc: "/projects/betterboxd-dark-preview.png",
    briefDescription:
      "Work in progress - case study on the weaknesses of Letterboxd's UX and lack of recommendation engine. I built a site that I consider to be a more-user friendly and intelligent version of Letterboxd, designed more for personal use versus Letterboxd's social media strenth. It features AI semantic search and a left vs. right swipe UI to help users easily pick their next watch.",
    inspiration:
      "Letterboxd's visual organization frustrates me - specifically how viewing your own ratings is buried deep in your profile, and the most important functions of the app often carry the same visual weight as functions that are likely never used by most users. Also, despite the large amount of data it collects, it has no reccomendation engine, leading to users aimlessly scrolling streaming services for something to watch.",
    goals: "Create a more versatile movie search and ranking app.",
    tools: "React + Vite, TypeScript, Supabase Auth and database sync, TMDB API",
    liveUrl: null,
  },
  {
    slug: "homememory",
    title: "HomeMemory",
    previewSrc: "/projects/homememory-dark-preview.png",
    briefDescription:
      "HomeMemory is a visual memory for your belongings. It helps you remember what you own and where everything is, whether it lives in a cabinet, moving box, or storage unit. It features semantic AI-powered search allowing users to ask HomeMemory questions about what they own.\n\nThe beta version for iOS is currently pending for App Store release.",
    inspiration:
      "Moving in and out of college dorms for the past few years showed me how quickly we forget where our belongings are stored. I frequently found myself wondering if I left a certain belonging in my storage unit at school, or if it was buried in a drawer or closet at home. HomeMemory aims to provide answers to those questions.",
    goals:
      "Create an app to help people avoid duplicate purchases, move into a new home, and remember what they own, with potential smart glasses applications in the future.",
    tools:
      "Swift / SwiftUI, SwiftData, Gemini API, OpenAI API, Firebase Analytics, Xcode",
    liveUrl: "https://www.33labs.org/homememory/",
    liveLabel: "Visit Site",
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

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>, projectSlug: string) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    setActiveProjectSlug(projectSlug);
  }

  return (
    <>
      <section className="projects-layout" aria-label="Projects" data-page-enter="content">
        {projects.map((project) => (
          <div
            aria-label={`Open ${project.title} project details`}
            className="project-card"
            key={project.slug}
            onClick={() => setActiveProjectSlug(project.slug)}
            onKeyDown={(event) => handleCardKeyDown(event, project.slug)}
            role="button"
            tabIndex={0}
          >
            <div aria-hidden="true" className="project-card-visual">
              <img
                alt=""
                src={project.previewSrc}
              />
            </div>
            <span className="project-card-title">{project.title}</span>
          </div>
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
            <p className="page-kicker">Project</p>
            <h2 id={activeProject ? `${activeProject.slug}-title` : undefined}>
              {activeProject?.title}
            </h2>
            {activeProject?.liveUrl ? (
              <a
                className="project-live-link"
                href={activeProject.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                {activeProject.liveLabel ?? `Open ${activeProject.title}`}
              </a>
            ) : null}
          </header>
          <div className="project-modal-sections">
            {projectSections.map((section) => (
              <section className="project-modal-section" key={section.key}>
                <h3>{section.label}</h3>
                <p>
                  {activeProject?.[section.key]}
                </p>
              </section>
            ))}
          </div>
        </article>
      </dialog>
    </>
  );
}
