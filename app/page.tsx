import { SiteHeader } from "./site-header";

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />
      <section className="home-intro" aria-labelledby="home-heading">
        <p>Artist + developer</p>
        <h1 id="home-heading">Sebastian Prusky</h1>
      </section>

      <nav className="portfolio-paths" aria-label="Portfolio sections">
        <a className="path path-art" href="/art">
          <span className="path-number">01</span>
          <span className="path-title">Art</span>
          <span className="path-detail">Sketches, paintings, photography</span>
          <img
            src="/art/painting-03-praying-mantises.jpeg"
            alt="Praying Mantises painting"
          />
        </a>
        <a className="path path-projects" href="/projects">
          <span className="path-number">02</span>
          <span className="path-title">Projects</span>
          <span className="path-detail">Technology and creative systems</span>
          <span className="project-mark" aria-hidden="true">
            SP
          </span>
        </a>
      </nav>
    </main>
  );
}
