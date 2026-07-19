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
          <h1>Artist and developer.</h1>
        </div>
        <div className="about-copy">
          <p>
            I make visual work and technical projects with an interest in
            observation, storytelling, and systems that feel clear to use.
          </p>
          <p className="about-note">
            Biography, resume, and final contact details will be added before
            launch.
          </p>
          <div className="contact-links" aria-label="Contact links">
            <a href="https://github.com/">GitHub</a>
            <a href="https://www.linkedin.com/">LinkedIn</a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </div>
      </section>
    </main>
  );
}
