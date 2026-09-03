import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../site-header";
import { artworks, isArtCategory } from "../../artworks";

type ArtworkPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return artworks.map((work) => ({ category: work.category, slug: work.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const work = artworks.find(
    (item) => item.category === category && item.slug === slug,
  );
  return work ? { title: `${work.title} | Sebastian Prusky` } : {};
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { category, slug } = await params;
  if (!isArtCategory(category)) notFound();

  const work = artworks.find(
    (item) => item.category === category && item.slug === slug,
  );
  if (!work) notFound();

  return (
    <main className="artwork-page">
      <SiteHeader current="art" />
      <Link className="back-link" href="/art">
        Back to Artwork
      </Link>
      <article className="artwork-detail">
        <div className="detail-image" data-page-enter="content">
          <img
            src={work.src}
            alt={work.title}
            decoding="async"
            height={work.height}
            width={work.width}
          />
        </div>
        <div className="detail-copy" data-page-enter="title">
          <p className="detail-category">Artwork</p>
          <h1>{work.title}</h1>
          <dl>
            <div>
              <dt>Year</dt>
              <dd>{work.year}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{work.medium}</dd>
            </div>
          </dl>
          <p className="detail-note">{work.note}</p>
        </div>
      </article>
    </main>
  );
}
