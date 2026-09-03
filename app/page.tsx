import type { Metadata } from "next";
import { ScrambleHeading } from "./scramble-heading";
import { SectionNav, SiteHeader } from "./site-header";
import { artworks } from "./art/artworks";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="home-page">
      {artworks.map((work) => (
        <link
          as="image"
          fetchPriority="low"
          href={work.thumbnailSrc}
          key={work.thumbnailSrc}
          rel="prefetch"
        />
      ))}
      <SiteHeader current="home" />
      <section className="home-intro" aria-labelledby="home-heading">
        <div className="home-intro-copy" data-page-enter="title">
          <ScrambleHeading accentLastWord autoPlay id="home-heading" key="home-heading">
            Sebastian Prusky Portfolio
          </ScrambleHeading>
          <p className="home-description" data-page-enter="content">
            exploring engineering, product design, and art
          </p>
        </div>
        <SectionNav className="home-section-nav" pageEnter="content" />
      </section>
    </main>
  );
}
