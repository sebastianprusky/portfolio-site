import type { Metadata } from "next";
import { ScrambleHeading } from "../scramble-heading";
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
        <ScrambleHeading
          className="gallery-title"
          id="art-heading"
          key="art-heading"
          stacked={false}
        >
          Sketches &amp; Paintings
        </ScrambleHeading>
      </header>
      <ArtGallery artworks={artworks} />
    </main>
  );
}
