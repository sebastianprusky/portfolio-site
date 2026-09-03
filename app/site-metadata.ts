export const siteUrl = "https://www.sebastianprusky.me";

export const defaultTitle = "Sebastian Prusky Portfolio";
export const defaultDescription =
  "Artist and developer exploring tech, product design, and art";

export const socialImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Sebastian Prusky Portfolio",
};

export function artworkDescription(
  title: string,
  medium: string,
  year: string,
) {
  return `${title}, ${medium}, ${year}. Artwork by Sebastian Prusky.`;
}
