const PAGE_ENTRY_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function animatePageEntry(root: ParentNode) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return [];

  const animations: Animation[] = [];
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
  // Reveal the home navigation in reading order, then its social links.
  const homeLinks = root.querySelectorAll<HTMLElement>(".home-section-nav a");
  homeLinks.forEach((element, index) => {
    animations.push(
      element.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 200 + index * 650,
        duration: 650,
        easing: "ease-in-out",
        fill: "backwards",
      }),
    );
  });
  root.querySelectorAll<HTMLElement>(".home-contact-links").forEach((element) => {
    animations.push(
      element.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 200 + homeLinks.length * 650,
        duration: 650,
        easing: "ease-in-out",
        fill: "backwards",
      }),
    );
  });
  return animations;
}
