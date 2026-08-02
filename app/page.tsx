import { SectionNav, SiteHeader } from "./site-header";

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader current="home" />
      <section className="home-intro" aria-labelledby="home-heading">
        <div className="home-intro-copy">
          <h1 id="home-heading">
            Sebastian Prusky <span>Portfolio</span>
          </h1>
          <p>exploring tech, product design, and art</p>
        </div>
        <SectionNav className="home-section-nav" />
      </section>
    </main>
  );
}
