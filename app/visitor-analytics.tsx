"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & {
  va?: (...args: unknown[]) => void;
  vaq?: unknown[][];
};

export function VisitorAnalytics() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !["sebastianprusky.me", "www.sebastianprusky.me"].includes(location.hostname)
    ) return;

    const key = "portfolio-analytics-disabled";
    let disabled = location.hash === "#analytics=off";
    try {
      if (disabled) localStorage.setItem(key, "1");
      disabled = disabled || localStorage.getItem(key) === "1";
    } catch {
      // A blocked storage API must not break the site or this visit's opt-out.
    }
    if (location.hash === "#analytics=off") {
      history.replaceState(history.state, "", location.pathname + location.search);
    }
    if (disabled || document.getElementById("portfolio-analytics")) return;

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.va = analyticsWindow.va || ((...args: unknown[]) => {
      (analyticsWindow.vaq = analyticsWindow.vaq || []).push(args);
    });
    analyticsWindow.va("beforeSend", (event: unknown) => {
      try {
        if (localStorage.getItem(key) === "1") return null;
      } catch {
        // Analytics can still operate when storage is unavailable.
      }
      return event;
    });
    const script = document.createElement("script");
    script.id = "portfolio-analytics";
    script.src = "/_vercel/insights/script.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return null;
}

