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

  // clones at both ends to make the carousel appear continuous
  const display = [artImages[count - 1], ...artImages, artImages[0]];

  // scroll to a display index; if we land on a clone, snap to the real item after the animation
  const scrollToDisplay = (displayIndex: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.children[displayIndex] as HTMLElement | undefined;
    if (!el) return;

    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", inline: "center", block: "nearest" });

    // if target is a cloned end, after smooth scroll finish, snap (instant) to the corresponding real item
    if (smooth && (displayIndex === 0 || displayIndex === count + 1)) {
      const snapTo = displayIndex === 0 ? count : 1; // 0 -> last real (display index count), count+1 -> first real (display index 1)
      // wait for the smooth scroll to finish, then snap instantly
      window.setTimeout(() => {
        const snapEl = container.children[snapTo] as HTMLElement | undefined;
        if (snapEl) snapEl.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
      }, 420); // match typical smooth duration
    }
  };

  const prev = () => {
    const nextLogical = (current - 1 + count) % count;
    setCurrent(nextLogical);
    const currentDisplay = current + 1;
    const targetDisplay = currentDisplay - 1;
    scrollToDisplay(targetDisplay, true);
  };

  const next = () => {
    const nextLogical = (current + 1) % count;
    setCurrent(nextLogical);
    const currentDisplay = current + 1;
    const targetDisplay = currentDisplay + 1;
    scrollToDisplay(targetDisplay, true);
  };

  // center on the first real item on mount without animation
  useEffect(() => {
    // allow layout to settle
    setTimeout(() => {
      scrollToDisplay(1, false); // display index 1 is the first real item
      setCurrent(0);
    }, 0);
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

        {/* arrows positioned relative to the carousel container for perfect symmetry */}
        <div
          style={{
            position: "absolute",
            left: "-60px", // distance from the left edge of the carousel container
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
            right: "-60px", // symmetric distance from the right edge of the carousel container
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