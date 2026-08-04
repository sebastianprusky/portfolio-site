"use client";

import { useEffect, useRef } from "react";

const NORTHWESTERN_HOLD_DURATION = 5000;

export function NorthwesternEasterEgg() {
  const restoreTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (restoreTimerRef.current !== null) {
        window.clearTimeout(restoreTimerRef.current);
      }
      document.getElementById("about-heading")?.classList.remove("is-northwestern");
    };
  }, []);

  function revealNorthwesternPurple() {
    const heading = document.getElementById("about-heading");
    if (!heading) return;

    if (restoreTimerRef.current !== null) {
      window.clearTimeout(restoreTimerRef.current);
    }

    if (heading.classList.contains("is-northwestern")) {
      heading.classList.remove("is-northwestern");
      restoreTimerRef.current = null;
      return;
    }

    heading.classList.add("is-northwestern");
    restoreTimerRef.current = window.setTimeout(() => {
      heading.classList.remove("is-northwestern");
      restoreTimerRef.current = null;
    }, NORTHWESTERN_HOLD_DURATION);
  }

  return (
    <button
      className="about-northwestern-trigger"
      onClick={revealNorthwesternPurple}
      type="button"
    >
      Northwestern University
    </button>
  );
}
