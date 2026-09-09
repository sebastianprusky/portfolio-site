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

    // Let the character cycling lead two overlapping entrance sequences.
    fade(".home-intro .scramble-text .scramble-word-name", 550, 0);
    fade(".home-intro .scramble-text .scramble-word-portfolio", 550, 180);
    fade(".site-header-home", 500, 0);
    fade(".home-description", 480, 340);
    fade(".home-section-nav a", 360, 220, 150);
    fade(".home-contact-links", 360, 670);
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
