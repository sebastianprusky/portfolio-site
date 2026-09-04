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

const firstRowArtworks = new Set([
  "desert-haircut",
  "bridge-cyclist",
  "night-drive",
]);

const galleryOrder = [
  "bridge-cyclist",
  "desert-haircut",
  "night-drive",
  "room-study",
  "praying-mantises",
  "restaurant",
  "spirit-landscape",
  "rollercoaster",
  "drake-study",
  "mantis-study",
  "palm-portrait",
  "blueberry-study",
];

const galleryColumns = [
  ["desert-haircut", "room-study", "praying-mantises", "drake-study"],
  ["bridge-cyclist", "restaurant", "mantis-study", "blueberry-study"],
  ["night-drive", "rollercoaster", "spirit-landscape", "palm-portrait"],
];

type ArtGalleryProps = {
  artworks: Artwork[];
};

type GalleryItemStyle = CSSProperties & {
  "--gallery-order"?: number;
};

function GalleryArtworkImage({ work }: { work: Artwork }) {
  const isFirstRow = firstRowArtworks.has(work.slug);

  return (
    <img
      alt=""
      decoding="async"
      fetchPriority={isFirstRow ? "high" : "auto"}
      height={work.height}
      loading={isFirstRow ? "eager" : "lazy"}
      src={work.thumbnailSrc}
      width={work.width}
    />
  );
}

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
      <div className="artwork-grid" data-page-enter="content">
        {galleryColumns.map((column, columnIndex) => (
          <div className="artwork-column" key={column.join("-")}>
            {column.map((slug) => {
              const work = artworksBySlug.get(slug);
              if (!work) return null;

              return (
                <button
                  aria-label={`${work.title}, ${work.medium}, ${work.year}`}
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
                  <GalleryArtworkImage work={work} />
                  <span aria-hidden="true" className="artwork-overlay">
                    <span className="artwork-overlay-title">{work.title}</span>
                    <span className="artwork-overlay-meta">{work.medium} · {work.year}</span>
                  </span>
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
                      aria-label={`${work.title}, ${work.medium}, ${work.year}`}
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
                      <GalleryArtworkImage work={work} />
                      <span aria-hidden="true" className="artwork-overlay">
                        <span className="artwork-overlay-title">{work.title}</span>
                        <span className="artwork-overlay-meta">{work.medium} · {work.year}</span>
                      </span>
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
              <img
                src={selectedWork.src}
                alt={selectedWork.title}
                decoding="async"
                height={selectedWork.height}
                width={selectedWork.width}
              />
            </div>
            <div className="detail-copy lightbox-copy">
              <h1 id="artwork-lightbox-title">{selectedWork.title}</h1>
              <p className="lightbox-subtitle">
                {selectedWork.year} · {selectedWork.medium}
              </p>
              <p className="detail-note">{selectedWork.note}</p>
            </div>
          </article>
        ) : null}
      </dialog>
    </>
  );
}
