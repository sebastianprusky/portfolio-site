"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

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

  function closeProject() {
    setIsBetterBoxdOpen(false);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeProject();
  }

  return (
    <>
      <section className="projects-layout" aria-label="Projects">
        <button
          className="project-card"
          onClick={() => setIsBetterBoxdOpen(true)}
          type="button"
        >
          <div className="project-card-visual" aria-hidden="true">
            <span>B</span>
            <span>B</span>
          </div>
          <span className="project-card-title">BetterBoxd</span>
        </button>
      </section>

      <dialog
        aria-labelledby="betterboxd-title"
        className="project-modal"
        onCancel={closeProject}
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
