"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Artwork } from "./artworks";

const featuredArtworks = new Set([
  "desert-haircut",
  "night-drive",
  "praying-mantises",
  "restaurant",
  "rollercoaster",
]);

const galleryOrder = new Map([
  ["bridge-cyclist", 1],
  ["desert-haircut", 2],
  ["night-drive", 3],
  ["room-study", 4],
  ["praying-mantises", 5],
  ["restaurant", 6],
  ["spirit-landscape", 7],
  ["rollercoaster", 8],
  ["drake-study", 9],
  ["mantis-study", 10],
  ["palm-portrait", 11],
  ["blueberry-study", 12],
]);

type ArtGalleryProps = {
  artworks: Artwork[];
};

type GalleryItemStyle = CSSProperties & {
  "--gallery-order"?: number;
};

export function ArtGallery({ artworks }: ArtGalleryProps) {
  const [selectedWork, setSelectedWork] = useState<Artwork | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedWork) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }

    if (dialog.open) dialog.close();
    lastActiveElementRef.current?.focus();
  }, [selectedWork]);

  function closeLightbox() {
    setSelectedWork(null);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeLightbox();
  }

  return (
    <>
      <div className="artwork-grid">
        {artworks.map((work) => (
          <button
            className="artwork-link"
            data-featured={featuredArtworks.has(work.slug) ? "true" : undefined}
            data-slug={work.slug}
            key={work.slug}
            onClick={() => setSelectedWork(work)}
            style={
              { "--gallery-order": galleryOrder.get(work.slug) } as GalleryItemStyle
            }
            type="button"
          >
            <img src={work.src} alt={work.title} />
            <span>{work.title}</span>
          </button>
        ))}
      </div>

      <dialog
        aria-labelledby={selectedWork ? "artwork-lightbox-title" : undefined}
        className="artwork-lightbox"
        onCancel={closeLightbox}
        onClick={handleBackdropClick}
        ref={dialogRef}
      >
        {selectedWork ? (
          <article className="lightbox-panel">
            <button
              aria-label="Close artwork details"
              className="lightbox-close"
              onClick={closeLightbox}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
            <div className="lightbox-image">
              <img src={selectedWork.src} alt={selectedWork.title} />
            </div>
            <div className="detail-copy lightbox-copy">
              <p className="detail-category">{selectedWork.category}</p>
              <h1 id="artwork-lightbox-title">{selectedWork.title}</h1>
              <dl>
                <div>
                  <dt>Year</dt>
                  <dd>{selectedWork.year}</dd>
                </div>
                <div>
                  <dt>Medium</dt>
                  <dd>{selectedWork.medium}</dd>
                </div>
              </dl>
              <p className="detail-note">{selectedWork.note}</p>
            </div>
          </article>
        ) : null}
      </dialog>
    </>
  );
}
