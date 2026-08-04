import type { Metadata } from "next";
import { AboutClock } from "../about-clock";
import { AboutEmail } from "../about-email";
import { ScrambleHeading } from "../scramble-heading";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "About | Sebastian Prusky",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader current="about" />
      <section className="about-layout" aria-labelledby="about-heading">
        <div className="about-identity" data-page-enter="title">
          <ScrambleHeading
            className="about-heading"
            id="about-heading"
            key="about-heading"
          >
            Sebastian Prusky
          </ScrambleHeading>
          <AboutClock />
        </div>
        <div className="about-copy" data-page-enter="content">
          <p>
            I&apos;m an engineer and artist from Miami, FL. My work focuses on
            projects that bring beauty and functionality to the user
            experience, across both visual art and tech. I&apos;m currently
            studying Industrial Engineering, MMSS, and Computer Science at
            Northwestern University.
          </p>
          <p className="about-note">
            You can reach me at <AboutEmail />.
          </p>
          <div className="contact-links" aria-label="Contact links">
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
          </div>
        </div>
      </section>
    </main>
  );
}
