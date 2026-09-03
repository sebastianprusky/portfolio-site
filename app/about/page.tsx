import type { Metadata } from "next";
import { AboutClock } from "../about-clock";
import { AboutEmail } from "../about-email";
import { AboutMiamiEasterEgg } from "../about-miami-easter-egg";
import { SiteHeader } from "../site-header";
import { socialImage } from "../site-metadata";

const title = "About | Sebastian Prusky";
const description =
  "About Sebastian Prusky, an engineer and artist from Miami studying Computer Science and MMSS at Northwestern University in Chicago.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/about",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage.url],
  },
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
    </main>
  );
}
