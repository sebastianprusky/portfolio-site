import type { Metadata } from "next";
import { AboutClock } from "../about-clock";
import { AboutEmail } from "../about-email";
import { AboutMiamiEasterEgg } from "../about-miami-easter-egg";
import { Recently } from "../recently";
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
          <h1 className="about-heading" id="about-heading">
            Sebastian
            <br />
            Prusky
          </h1>
          <AboutClock />
        </div>
        <div className="about-copy" data-page-enter="content">
          <AboutMiamiEasterEgg />
          <p className="about-note">
            You can reach me at <AboutEmail />.
          </p>
          <nav className="contact-links" aria-label="Contact links">
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
        </div>
      </section>
      <Recently />
    </main>
  );
}
