"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { recentItems, recentlyUpdated, type RecentItem } from "./recently-data";

type EmbeddedRecentItem = RecentItem & {
  action: Extract<RecentItem["action"], { type: "embed" }>;
};

function isEmbeddedItem(item: RecentItem): item is EmbeddedRecentItem {
  return item.action.type === "embed";
}

export function Recently() {
  const [activeItem, setActiveItem] = useState<EmbeddedRecentItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeItem) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }

    if (dialog.open) dialog.close();
    lastActiveElementRef.current?.focus();
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) return;

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") closePlayer();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeItem]);

  function closePlayer() {
    setActiveItem(null);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closePlayer();
  }

  return (
    <>
      <section
        aria-labelledby="recently-heading"
        className="recently-section"
        data-page-enter="content"
      >
        <header className="recently-header">
          <h2 id="recently-heading">Recently</h2>
          <p>Updated {recentlyUpdated}</p>
        </header>

        <div className="recently-grid">
          {recentItems.map((item) => {
            const media = (
              <span
                className={`recent-media recent-media-${item.visualTreatment}`}
              >
                {/* Local, dimensioned editorial assets intentionally preserve their native proportions. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={item.imageAlt}
                  decoding="async"
                  height={item.imageHeight}
                  loading="lazy"
                  src={item.imageSrc}
                  width={item.imageWidth}
                />
                {isEmbeddedItem(item) ? (
                  <span aria-hidden="true" className="recent-play-mark">
                    <span>Play</span>
                  </span>
                ) : null}
              </span>
            );

            return (
              <article
                className={`recent-item recent-item-${item.slug}`}
                key={item.slug}
              >
                {item.action.type === "link" ? (
                  <a
                    aria-label={`${item.action.label}: ${item.title}`}
                    className="recent-media-link"
                    href={item.action.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {media}
                  </a>
                ) : (
                  <button
                    aria-label={`${item.action.label}: ${item.title}`}
                    className="recent-media-button"
                    onClick={() => setActiveItem(item as EmbeddedRecentItem)}
                    type="button"
                  >
                    {media}
                  </button>
                )}

                <div className="recent-item-copy">
                  <p className="recent-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p className="recent-byline">{item.byline}</p>
                  {item.description ? (
                    <p className="recent-description">{item.description}</p>
                  ) : null}
                  {item.action.type === "link" ? (
                    <a
                      className="recent-action"
                      href={item.action.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.action.label} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <button
                      className="recent-action"
                      onClick={() => setActiveItem(item as EmbeddedRecentItem)}
                      type="button"
                    >
                      {item.action.label}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <dialog
        aria-labelledby="recent-player-title"
        className="recent-player"
        onCancel={closePlayer}
        onClose={closePlayer}
        onClick={handleBackdropClick}
        ref={dialogRef}
      >
        {activeItem ? (
          <article className="recent-player-panel">
            <button
              aria-label={`Close ${activeItem.title} player`}
              className="recent-player-close"
              onClick={closePlayer}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
            <div className="recent-player-heading">
              <p className="recent-category">Now playing</p>
              <h2 id="recent-player-title">{activeItem.title}</h2>
              <p>{activeItem.byline}</p>
            </div>
            <iframe
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              height={activeItem.action.embedHeight}
              loading="lazy"
              src={activeItem.action.embedUrl}
              title={activeItem.action.embedTitle}
            />
            <a
              className="recent-player-external"
              href={activeItem.action.externalHref}
              rel="noreferrer"
              target="_blank"
            >
              {activeItem.action.externalLabel} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ) : null}
      </dialog>
    </>
  );
}
