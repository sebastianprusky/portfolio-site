import { ScrambleHeading } from "./scramble-heading";
import { SectionNav, SiteHeader } from "./site-header";

export default function Home() {
  return (
    <main className="home-page">
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
