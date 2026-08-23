export type RecentItem = {
  slug: string;
  category: "Tech" | "Read" | "Enjoyed";
  title: string;
  byline: string;
  action:
    | {
        type: "link";
        href: string;
        label: string;
      }
    | {
        type: "embed";
        embedTitle: string;
        embedUrl: string;
        embedHeight: number;
      };
};

export const recentlyUpdated = "August 2026";

export const recentItems: RecentItem[] = [
  {
    slug: "espanso",
    category: "Tech",
    title: "espanso",
    byline: "Desktop text expander",
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
    action: {
      type: "embed",
      embedTitle: "Spotify player for Purple by Nas",
      embedUrl:
        "https://open.spotify.com/embed/track/1i2fcqyMYvpvuLyJyOLEAt?utm_source=generator",
      embedHeight: 80,
    },
  },
];
