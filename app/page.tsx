import type { Metadata } from "next";
import { IdleProjectImagePrefetch } from "./idle-image-prefetch";
import { ScrambleHeading } from "./scramble-heading";
import { SectionNav, SiteHeader } from "./site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="home-page">
      <IdleProjectImagePrefetch />
      <SiteHeader current="home" />
      <section className="home-intro" aria-labelledby="home-heading">
        <div className="home-intro-copy" data-page-enter="title">
          <ScrambleHeading accentLastWord id="home-heading" key="home-heading">
            Sebastian Prusky Portfolio
          </ScrambleHeading>
          <p className="home-description" data-page-enter="content">
            exploring engineering, product design, and art
          </p>
        </div>
        <SectionNav className="home-section-nav" />
      </section>
      <nav className="contact-links home-contact-links" aria-label="Contact links">
        <a
          aria-label="GitHub"
          href="https://github.com/sebastianprusky"
          rel="noreferrer"
          target="_blank"
        >
          <span aria-hidden="true" className="contact-icon contact-icon-github" />
        </a>
        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/sebastian-prusky"
          rel="noreferrer"
          target="_blank"
        >
          <span aria-hidden="true" className="contact-icon contact-icon-linkedin" />
        </a>
      </nav>
    </main>
  );
}
