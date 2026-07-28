"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const betterBoxdUrl = "https://i-want-to-make-a-better.vercel.app";

const projectSections = [
  "Brief description",
  "Demo",
  "Inspiration",
  "Goals",
  "Tools / Software",
];

const projects = [
  {
    slug: "betterboxd",
    title: "betterboxd",
    previewSrc: "/projects/betterboxd-dark-preview.png",
    previewClassName: "",
    liveUrl: betterBoxdUrl,
  },
  {
    slug: "homememory",
    title: "HomeMemory",
    previewSrc: "/projects/homememory-dark-preview.png",
    previewClassName: "project-card-visual-contained",
    liveUrl: "",
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
      <section className="projects-layout" aria-label="Projects">
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
            <div
              aria-hidden="true"
              className={[
                "project-card-visual",
                project.previewClassName,
              ].filter(Boolean).join(" ")}
            >
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
                Open {activeProject.title}
              </a>
            ) : null}
          </header>
          <div className="project-modal-sections">
            {projectSections.map((section) => (
              <section className="project-modal-section" key={section}>
                <h3>{section}</h3>
                <p>Placeholder content pending.</p>
              </section>
            ))}
          </div>
        </article>
      </dialog>
    </>
  );
}
