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
      <header className="gallery-header" data-page-enter="title">
        <h1 className="gallery-title" id="art-heading">
          Sketches &amp; Paintings
        </h1>
      </header>
      <ArtGallery artworks={artworks} />
    </main>
  );
}
