import { SiteHeader } from "./site-header";

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader current="home" />
      <section className="home-intro" aria-labelledby="home-heading">
        <h1 id="home-heading">Sebastian Prusky Portfolio</h1>
        <p>Artist and developer exploring observation, imagination, and craft.</p>
      </section>
    </main>
  );
}
