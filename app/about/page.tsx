import type { Metadata } from "next";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "About | Sebastian Prusky",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader current="about" />
      <section className="about-layout">
        <div>
          <p className="page-kicker">About</p>
          <h1 className="about-heading">Sebastian Prusky</h1>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m an artist and designer, passionate about introducing simple
            beauty and functionality to the user experience across both visual
            art and tech. I&apos;m originally from Miami, FL, and currently
            studying Industrial Engineering, MMSS, and CS at Northwestern
            University.
          </p>
          <p className="about-note">
            You can reach me at sebastianprusky2028@u.northwestern.edu
          </p>
          <div className="contact-links" aria-label="Contact links">
            <a
              href="https://github.com/sebastianprusky"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sebastian-prusky"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a href="mailto:sebastianprusky2028@u.northwestern.edu">Email</a>
          </div>
        </div>
      </section>
    </main>
  );
}
