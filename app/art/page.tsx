"use client";

import { useRef, useLayoutEffect, useState } from "react";

type ArtItem = { src: string; title: string; subtitle?: string; };

const artImages: ArtItem[] = [
  { src: "/prayingmantises.JPEG", title: "seaside", subtitle: "oil on wood board" },
  { src: "/mantissketch.jpg", title: "seaside (planning sketch)", subtitle: "" },
  { src: "/restaurant.jpg", title: "red restaurant", subtitle: "oil on canvas" },
  { src: "/drive.jpg", title: "navigator", subtitle: "oil on canvas" },
  { src: "/rollercoaster.jpg", title: "pit stop", subtitle: "oil on canvas" },
  { src: "/deserthaircut.jpg", title: "deserted", subtitle: "oil on wood board" },
  { src: "/desertsketch.jpg", title: "deserted (planning sketch)", subtitle: "" },
  { src: "/gate.jpg", title: "gates", subtitle: "colored pencil on watercolor paper" },
  { src: "/treeman.jpg", title: "rodeo", subtitle: "colored pencil on black paper" },
];

export default function Art() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const REPEAT = 10; // total repetitions
  const repeated: ArtItem[] = Array.from({ length: REPEAT }, () => artImages).flat();
  const count = artImages.length;
  const total = repeated.length;

  // desired start: first painting of 6th cycle -> zero-based index = 5 * count
  const START_CYCLE = 6;
  const initialIndex = (START_CYCLE - 1) * count;

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [ready, setReady] = useState(false); // block nav until initialized

  const computeTargetLeft = (container: HTMLElement, child: HTMLElement) => {
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    return Math.max(0, childCenter - container.clientWidth / 2);
  };

  const scrollToIndex = (index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    const el = container.children[clamped] as HTMLElement | undefined;
    if (!el) return;
    const left = computeTargetLeft(container, el);
    if (smooth) container.scrollTo({ left, behavior: "smooth" });
    else container.scrollLeft = left;
  };

  const prev = () => {
    if (!ready) return;
    if (currentIndex <= 0) return;
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex, true);
  };

  const next = () => {
    if (!ready) return;
    if (currentIndex >= total - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex, true);
  };

  // Synchronously set initial scrollLeft before paint to avoid any visible jump.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If children aren't present yet, try one animation frame synchronously.
    if (container.children.length <= initialIndex) {
      const id = window.requestAnimationFrame(() => {
        const el = container.children[initialIndex] as HTMLElement | undefined;
        if (el) {
          // temporarily disable smooth behavior, set position, force reflow, then re-enable
          const prevBehavior = container.style.scrollBehavior;
          container.style.scrollBehavior = "auto";
          container.scrollLeft = computeTargetLeft(container, el);
          // force reflow so the browser paints the position immediately
          container.getBoundingClientRect();
          container.style.scrollBehavior = prevBehavior || "";
          setCurrentIndex(initialIndex);
          setReady(true);
        } else {
          // fallback: mark ready so user can interact (no jump prevention)
          setReady(true);
        }
      });
      return () => window.cancelAnimationFrame(id);
    }

    // children present: set position synchronously
    const el = container.children[initialIndex] as HTMLElement | undefined;
    if (el) {
      const prevBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";
      container.scrollLeft = computeTargetLeft(container, el);
      // force reflow then restore behavior
      container.getBoundingClientRect();
      container.style.scrollBehavior = prevBehavior || "";
      setCurrentIndex(initialIndex);
      setReady(true);
    } else {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative px-4">
      {/* section header — use the same spacing as other pages */}
      <h1
        className="text-2xl font-semibold mt-0 mb-1 text-center"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        artwork
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">a selection of my pieces and sketches from over the years</div>

      <div
        className="relative w-full flex items-center justify-center mb-4"
        style={{ minHeight: "32rem", width: "820px" }}
      >
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

        {/* carousel wrapper: arrows positioned relative to this so they slightly overlap the carousel ends */}
        <div className="relative w-full max-w-[820px] mx-auto">
          {/* left arrow: slight overlap into the carousel (smaller overlap on mobile) */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
            style={{ left: -28, minWidth: 56, height: 56 }}
          >
            &#8592;
          </button>

          <div
            ref={containerRef}
            className="w-full overflow-x-auto art-carousel no-scrollbar px-4 sm:px-6 py-4 flex gap-4 sm:gap-6 snap-x snap-mandatory"
          >
            {repeated.map((item, i) => (
              <figure
                key={i}
                style={{ boxShadow: "none" }}
                className={`art-item snap-center flex-shrink-0 flex flex-col items-center ${i === currentIndex ? "active" : ""}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full max-w-[28rem] sm:max-w-none h-44 sm:h-[28rem] object-contain shadow-none"
                  style={{ filter: "none", boxShadow: "none" }}
                  loading="lazy"
                />
                 <figcaption className="mt-3 text-center">
                   <div className="font-semibold">{item.title}</div>
                   {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
                 </figcaption>
               </figure>
             ))}
          </div>

          {/* right arrow: slight overlap into the carousel (smaller overlap on mobile) */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
            style={{ right: -28, minWidth: 56, height: 56 }}
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* removed stray LinkedIn anchor from art page */}
    </main>
  );
}