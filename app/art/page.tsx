import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../site-header";
import { artworks } from "./artworks";

export const metadata: Metadata = {
  title: "Sketches & Paintings | Sebastian Prusky",
};

export default function ArtPage() {
  return (
    <main className="gallery-page">
      <SiteHeader current="art" />
      <header className="gallery-header">
        <p className="page-kicker">Art</p>
        <h1>Sketches &amp; Paintings</h1>
        <p>{artworks.length} works</p>
      </header>
      <div className="artwork-grid">
        {artworks.map((work) => (
          <Link
            className="artwork-link"
            href={`/art/${work.category}/${work.slug}`}
            key={work.slug}
          >
            <img src={work.src} alt={work.title} />
            <span>{work.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
