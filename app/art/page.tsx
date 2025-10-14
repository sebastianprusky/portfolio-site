"use client";

import { useRef, useEffect, useState } from "react";

type ArtItem = { src: string; title: string; subtitle?: string; };

const artImages: ArtItem[] = [
  { src: "/restaurant.jpg", title: "red restaurant", subtitle: "oil on canvas" },
  { src: "/drive.jpg", title: "navigator", subtitle: "oil on canvas" },
  { src: "/prayingmantises.JPEG", title: "seaside", subtitle: "oil on wood board" },
  { src: "/mantissketch.jpg", title: "seaside (planning sketch)", subtitle: "" },
  { src: "/rollercoaster.jpg", title: "pit stop", subtitle: "oil on canvas" },
  { src: "/deserthaircut.jpg", title: "deserted", subtitle: "oil on wood board" },
  { src: "/desertsketch.jpg", title: "deserted (planning sketch)", subtitle: "" },
  { src: "/gate.jpg", title: "gates", subtitle: "colored pencil on watercolor paper" },
  { src: "/treeman.jpg", title: "rodeo", subtitle: "colored pencil on black paper" },
];

export default function Art() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const count = artImages.length;

  // clones at both ends so we can show last on the left of first, etc.
  const display = [artImages[count - 1], ...artImages, artImages[0]];

  // compute target left position to center a child element
  const computeTargetLeft = (container: HTMLElement, child: HTMLElement) => {
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    const target = Math.max(0, childCenter - container.clientWidth / 2);
    return target;
  };

  // scroll container to displayIndex (index in the display[] array)
  // if smooth=true we animate; if we land on a clone, snap to real after animation
  const scrollToDisplay = (displayIndex: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.children[displayIndex] as HTMLElement | undefined;
    if (!el) return;

    const left = computeTargetLeft(container, el);
    container.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });

    // handle clone snapping: when we target the leading (0) or trailing (count+1) clone
    if (smooth && (displayIndex === 0 || displayIndex === count + 1)) {
      const snapTo = displayIndex === 0 ? count : 1; // map to real display index
      // wait for the smooth animation to complete, then snap instantly
      const SNAP_DELAY = 420; // matches smooth timing used elsewhere
      window.setTimeout(() => {
        const snapEl = container.children[snapTo] as HTMLElement | undefined;
        if (snapEl) {
          const snapLeft = computeTargetLeft(container, snapEl);
          container.scrollTo({ left: snapLeft, behavior: "auto" });
        }
      }, SNAP_DELAY);
    }
  };

  const prev = () => {
    const nextLogical = (current - 1 + count) % count;
    setCurrent(nextLogical);

    const currentDisplay = current + 1; // account for leading clone
    const targetDisplay = currentDisplay - 1;
    scrollToDisplay(targetDisplay, true);
  };

  const next = () => {
    const nextLogical = (current + 1) % count;
    setCurrent(nextLogical);

    const currentDisplay = current + 1; // account for leading clone
    const targetDisplay = currentDisplay + 1;
    scrollToDisplay(targetDisplay, true);
  };

  // on mount, wait a tick for layout then snap (non-animated) to the first real item
  useEffect(() => {
    const id = window.setTimeout(() => {
      // display index 1 is the first real item
      scrollToDisplay(1, false);
      setCurrent(0);
    }, 50); // short delay lets browser compute sizes
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4">
      <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: "Times New Roman, Times, serif" }}>
        artwork
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">a selection of my pieces and sketches from over the years</div>

      <div
        className="relative w-full flex items-center justify-center mb-4"
        style={{ minHeight: "32rem", width: "820px" }}
      >
        {/* clickable halves */}
        <button
          aria-label="Previous (left side)"
          onClick={prev}
          className="absolute left-0 top-0 h-full w-1/2 z-20 bg-transparent cursor-pointer"
        />
        <button
          aria-label="Next (right side)"
          onClick={next}
          className="absolute right-0 top-0 h-full w-1/2 z-20 bg-transparent cursor-pointer"
        />

        {/* left arrow positioned relative to carousel for symmetry */}
        <div
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous"
            className="text-3xl px-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
            style={{ minWidth: "80px" }}
          >
            &#8592;
          </button>
        </div>

        <div
          ref={containerRef}
          className="w-full max-w-5xl mx-auto overflow-x-auto art-carousel no-scrollbar px-6 py-4 flex gap-6 snap-x snap-mandatory"
        >
          {display.map((item, i) => {
            const logicalIndex = (i - 1 + count) % count;
            return (
              <figure
                key={i}
                style={{ boxShadow: "none" }}
                className={`art-item snap-center flex-shrink-0 flex flex-col items-center ${
                  current === logicalIndex ? "active" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-[28rem] w-auto object-contain shadow-none"
                  style={{ filter: "none", boxShadow: "none" }}
                  loading="lazy"
                />
                <figcaption className="mt-3 text-center">
                  <div className="font-semibold">{item.title}</div>
                  {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
          }}
        >
          <button
            onClick={next}
            aria-label="Next"
            className="text-3xl px-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
            style={{ minWidth: "80px" }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </main>
  );
}