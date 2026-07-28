import type { Metadata } from "next";
import { SiteHeader } from "../site-header";
import { ArtGallery } from "./art-gallery";
import { artworks } from "./artworks";

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
      <ArtGallery artworks={artworks} />
    </main>
  );
}
