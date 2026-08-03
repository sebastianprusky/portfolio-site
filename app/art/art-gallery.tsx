"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Artwork } from "./artworks";

const featuredArtworks = new Set([
  "desert-haircut",
  "blue-figure",
  "night-drive",
  "ribbon-figure",
  "praying-mantises",
  "restaurant",
  "red-flowers",
  "rollercoaster",
]);

const galleryOrder = [
  "bridge-cyclist",
  "desert-haircut",
  "blue-figure",
  "night-drive",
  "room-study",
  "ribbon-figure",
  "praying-mantises",
  "restaurant",
  "red-flowers",
  "spirit-landscape",
  "rollercoaster",
  "drake-study",
  "mantis-study",
  "palm-portrait",
  "blueberry-study",
];

const galleryColumns = [
  ["desert-haircut", "blue-figure", "room-study", "praying-mantises", "drake-study"],
  ["bridge-cyclist", "ribbon-figure", "restaurant", "mantis-study", "blueberry-study"],
  ["night-drive", "red-flowers", "rollercoaster", "spirit-landscape", "palm-portrait"],
];

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
  const artworksBySlug = new Map(artworks.map((work) => [work.slug, work]));
  const orderedWorks = [
    ...galleryOrder
      .map((slug) => artworksBySlug.get(slug))
      .filter((work): work is Artwork => Boolean(work)),
    ...artworks.filter((work) => !galleryOrder.includes(work.slug)),
  ];

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

  useEffect(() => {
    if (!selectedWork) return;

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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
        {galleryColumns.map((column, columnIndex) => (
          <div className="artwork-column" key={column.join("-")}>
            {column.map((slug) => {
              const work = artworksBySlug.get(slug);
              if (!work) return null;

              return (
                <button
                  className="artwork-link"
                  data-featured={featuredArtworks.has(work.slug) ? "true" : undefined}
                  data-slug={work.slug}
                  key={work.slug}
                  onClick={() => setSelectedWork(work)}
                  style={
                    {
                      "--gallery-order": orderedWorks.indexOf(work) + 1,
                    } as GalleryItemStyle
                  }
                  type="button"
                >
                  <img src={work.src} alt={work.title} />
                  <span>{work.title}</span>
                </button>
              );
            })}
            {columnIndex === galleryColumns.length - 1
              ? orderedWorks
                  .filter(
                    (work) =>
                      !galleryColumns.some((galleryColumn) =>
                        galleryColumn.includes(work.slug),
                      ),
                  )
                  .map((work) => (
                    <button
                      className="artwork-link"
                      data-featured={
                        featuredArtworks.has(work.slug) ? "true" : undefined
                      }
                      data-slug={work.slug}
                      key={work.slug}
                      onClick={() => setSelectedWork(work)}
                      style={
                        {
                          "--gallery-order": orderedWorks.indexOf(work) + 1,
                        } as GalleryItemStyle
                      }
                      type="button"
                    >
                      <img src={work.src} alt={work.title} />
                      <span>{work.title}</span>
                    </button>
                  ))
              : null}
          </div>
        ))}
      </div>

      <dialog
        aria-labelledby={selectedWork ? "artwork-lightbox-title" : undefined}
        className="artwork-lightbox"
        onCancel={closeLightbox}
        onClose={closeLightbox}
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
