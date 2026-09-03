import type { Metadata } from "next";
import { SiteHeader } from "../site-header";
import { socialImage } from "../site-metadata";
import { ArtGallery } from "./art-gallery";
import { artworks } from "./artworks";

const title = "Artwork | Sebastian Prusky";
const description =
  "Paintings and mixed-media studies by Sebastian Prusky, exploring color, perspective, memory, and surreal scenes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/art" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/art",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage.url],
  },
};

export default function ArtPage() {
  return (
    <main className="gallery-page">
      <SiteHeader current="art" />
      <header className="gallery-header" data-page-enter="title">
        <h1 className="gallery-title" id="art-heading">
          Artwork
        </h1>
      </header>
      <ArtGallery artworks={artworks} />
    </main>
  );
}
