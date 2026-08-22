export type RecentItem = {
  slug: string;
  category: "Tech" | "Read" | "Enjoyed";
  title: string;
  byline: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  visualTreatment: "logo" | "cover";
  action:
    | {
        type: "link";
        href: string;
        label: string;
      }
    | {
        type: "embed";
        label: string;
        embedTitle: string;
        embedUrl: string;
        embedHeight: number;
        externalHref: string;
        externalLabel: string;
      };
};

export const recentlyUpdated = "August 2026";

export const recentItems: RecentItem[] = [
  {
    slug: "espanso",
    category: "Tech",
    title: "espanso",
    byline: "Desktop text expander",
    description:
      "A simple desktop app for expanding short text triggers into phrases I use repeatedly.",
    imageSrc: "/recently/espanso-logo.svg",
    imageAlt: "espanso wordmark",
    imageWidth: 255,
    imageHeight: 78,
    visualTreatment: "logo",
    action: {
      type: "link",
      href: "https://espanso.org/",
      label: "Visit espanso",
    },
  },
  {
    slug: "normal-people",
    category: "Read",
    title: "Normal People",
    byline: "Sally Rooney",
    imageSrc: "/recently/normal-people.jpg",
    imageAlt: "Cover of Normal People by Sally Rooney",
    imageWidth: 300,
    imageHeight: 483,
    visualTreatment: "cover",
    action: {
      type: "link",
      href: "https://www.google.com/search?q=Normal+People+Sally+Rooney",
      label: "Search the book",
    },
  },
  {
    slug: "purple",
    category: "Enjoyed",
    title: "Purple",
    byline: "Nas · The Lost Tapes, 2002",
    imageSrc: "/recently/nas-the-lost-tapes.jpg",
    imageAlt: "Cover of The Lost Tapes by Nas",
    imageWidth: 300,
    imageHeight: 300,
    visualTreatment: "cover",
    action: {
      type: "embed",
      label: "Play on Spotify",
      embedTitle: "Spotify player for Purple by Nas",
      embedUrl:
        "https://open.spotify.com/embed/track/1i2fcqyMYvpvuLyJyOLEAt?utm_source=generator",
      embedHeight: 152,
      externalHref: "https://open.spotify.com/track/1i2fcqyMYvpvuLyJyOLEAt",
      externalLabel: "Open in Spotify",
    },
  },
];
