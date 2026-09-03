export type RecentItem = {
  slug: string;
  category: "Tech" | "Read";
  title: string;
  byline: string;
  action: {
    href: string;
    label: string;
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
      href: "https://www.google.com/search?q=Normal+People+Sally+Rooney",
      label: "Search the book",
    },
  },
];
