"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const betterBoxdUrl = "https://i-want-to-make-a-better.vercel.app";

const betterBoxdSections = [
  "Brief description",
  "Demo",
  "Inspiration",
  "Goals",
  "Tools / Software",
];

export function ProjectsList() {
  const [isBetterBoxdOpen, setIsBetterBoxdOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isBetterBoxdOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }

    if (dialog.open) dialog.close();
    lastActiveElementRef.current?.focus();
  }, [isBetterBoxdOpen]);

  useEffect(() => {
    if (!isBetterBoxdOpen) return;

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") closeProject();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isBetterBoxdOpen]);

  function closeProject() {
    setIsBetterBoxdOpen(false);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeProject();
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    setIsBetterBoxdOpen(true);
  }

  return (
    <>
      <section className="projects-layout" aria-label="Projects">
        <div
          aria-label="Open BetterBoxd project details"
          className="project-card"
          onClick={() => setIsBetterBoxdOpen(true)}
          onKeyDown={handleCardKeyDown}
          role="button"
          tabIndex={0}
        >
          <div className="project-card-visual" aria-hidden="true">
            <iframe
              loading="lazy"
              src={betterBoxdUrl}
              tabIndex={-1}
              title="Live BetterBoxd home screen preview"
            />
          </div>
          <span className="project-card-title">BetterBoxd</span>
        </div>
      </section>

      <dialog
        aria-labelledby="betterboxd-title"
        className="project-modal"
        onCancel={closeProject}
        onClose={closeProject}
        onClick={handleBackdropClick}
        ref={dialogRef}
      >
        <article className="project-modal-panel">
          <button
            aria-label="Close BetterBoxd details"
            className="project-modal-close"
            onClick={closeProject}
            ref={closeButtonRef}
            type="button"
          >
            Close
          </button>
          <header className="project-modal-header">
            <p className="page-kicker">Project</p>
            <h2 id="betterboxd-title">BetterBoxd</h2>
            <a
              className="project-live-link"
              href={betterBoxdUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open BetterBoxd
            </a>
          </header>
          <div className="project-modal-sections">
            {betterBoxdSections.map((section) => (
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
