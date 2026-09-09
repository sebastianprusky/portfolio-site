const PAGE_ENTRY_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function animatePageEntry(root: ParentNode) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return [];

  const animations: Animation[] = [];
  if (root.querySelector(".home-page")) {
    const fade = (selector: string, duration: number, delay: number, stagger = 0) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        animations.push(
          element.animate([{ opacity: 0 }, { opacity: 1 }], {
            delay: delay + index * stagger,
            duration,
            easing: "ease-in-out",
            fill: "backwards",
          }),
        );
      });
    };

    // Use one gentle entrance style, with a quick, overlapping reading-order stagger.
    fade(".home-intro h1", 600, 0);
    fade(".site-header-home", 500, 0);
    fade(".home-description", 500, 80);
    fade(".home-section-nav a", 320, 180, 220);
    fade(".home-contact-links", 320, 840);
    return animations;
  }

  const animateElements = (
    selector: string,
    translateY: number,
    duration: number,
    delay: number,
  ) => {
    root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      animations.push(
        element.animate(
          [
            { opacity: 0, transform: `translateY(${translateY}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            delay,
            duration,
            easing: PAGE_ENTRY_EASING,
            fill: "backwards",
          },
        ),
      );
    });
  };

  animateElements('[data-page-enter="title"]', 12, 400, 0);
  animateElements('[data-page-enter="content"]', 16, 500, 70);
  return animations;
}
