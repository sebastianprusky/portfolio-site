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
          <h1 className="about-heading">
            <span>Sebastian</span>
            <span>Prusky</span>
          </h1>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m an artist and designer from Miami, FL. My work focuses on
            projects that bring beauty and functionality to the user
            experience, across both visual art and tech. I&apos;m currently
            studying Industrial Engineering, MMSS, and Computer Science at
            Northwestern University.
          </p>
          <p className="about-note">
            You can reach me at sebastianprusky2028@u.northwestern.edu.
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
          </div>
        </div>
      </section>
    </main>
  );
}
