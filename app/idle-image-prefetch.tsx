"use client";

import { useEffect } from "react";
import { projectPreviewImages } from "./projects/project-assets";

type BrowserWindow = Window &
  typeof globalThis & {
    cancelIdleCallback?: (handle: number) => void;
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
  };

export function IdleProjectImagePrefetch() {
  useEffect(() => {
    const browserWindow = window as BrowserWindow;
    const pendingImages = [...projectPreviewImages];
    let cancelled = false;
    let idleHandle: number | undefined;
    let timerHandle: number | undefined;
    let activeImage: HTMLImageElement | undefined;

    const warmNextImage = () => {
      if (cancelled || pendingImages.length === 0) return;

      const image = new Image();
      activeImage = image;
      image.decoding = "async";
      image.fetchPriority = "low";
      image.onload = image.onerror = () => {
        activeImage = undefined;
        timerHandle = window.setTimeout(warmNextImage, 150);
      };
      image.src = pendingImages.shift()!;
    };

    const beginWhenIdle = () => {
      if (browserWindow.requestIdleCallback) {
        idleHandle = browserWindow.requestIdleCallback(warmNextImage, {
          timeout: 3000,
        });
      } else {
        timerHandle = window.setTimeout(warmNextImage, 1500);
      }
    };

    if (document.readyState === "complete") {
      beginWhenIdle();
    } else {
      window.addEventListener("load", beginWhenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", beginWhenIdle);
      if (idleHandle !== undefined) {
        browserWindow.cancelIdleCallback?.(idleHandle);
      }
      if (timerHandle !== undefined) window.clearTimeout(timerHandle);
      if (activeImage) {
        activeImage.onload = null;
        activeImage.onerror = null;
      }
    };
  }, []);

  return null;
}
