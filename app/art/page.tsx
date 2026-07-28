import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteHeader } from "../site-header";
import { artworks } from "./artworks";

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

export const metadata: Metadata = {
  title: "Sketches & Paintings | Sebastian Prusky",
};

export default function ArtPage() {
  return (
    <main className="gallery-page">
      <SiteHeader current="art" />
      <header className="gallery-header">
        <h1>Sketches &amp; Paintings</h1>
        <p className="works-count">{artworks.length} works</p>
      </header>
      <div className="artwork-grid">
        {artworks.map((work) => (
          <Link
            className="artwork-link"
            data-featured={featuredArtworks.has(work.slug) ? "true" : undefined}
            data-slug={work.slug}
            href={`/art/${work.category}/${work.slug}`}
            key={work.slug}
            style={{ "--gallery-order": galleryOrder.get(work.slug) } as CSSProperties}
          >
            <img src={work.src} alt={work.title} />
            <span>{work.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
