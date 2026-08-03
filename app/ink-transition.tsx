"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { InkJarImage } from "./ink-jar";
import { animatePageEntry } from "./page-entry";

export type InkDirection = "forward" | "reverse";
export type InkOrigin = { x: number; y: number };
export type PortfolioTheme = "light" | "dark";

type Point = readonly [number, number];

type BeginableAnimation = SVGElement & {
  beginElement: () => void;
};

type InkTransitionProps = {
  direction: InkDirection;
  origin: InkOrigin;
  onCommit: () => void;
  onComplete: () => void;
  sourceTheme: PortfolioTheme;
  targetTheme: PortfolioTheme;
};

const INK_DURATION_MS = 1800;

const PATH_TIMES_FORWARD = "0;0.1;0.3;0.43;0.56;0.68;0.8;0.91;1";
const PATH_TIMES_REVERSE = "0;0.12;0.25;0.4;0.55;0.7;0.82;0.93;1";

// Each outline has the same 20-point topology. Linear interpolation across all
// nine states avoids the repeated acceleration/deceleration that felt bursty.
const INK_OUTLINES: readonly (readonly Point[])[] = [
  [
    [.902, .052], [.906, .041], [.918, .034], [.931, .037], [.941, .047],
    [.943, .06], [.937, .07], [.928, .076], [.917, .075], [.907, .069],
    [.901, .061], [.9, .056], [.901, .053], [.902, .052], [.902, .052],
    [.902, .052], [.902, .052], [.902, .052], [.902, .052], [.902, .052],
  ],
  [
    [.903, .049], [.911, .038], [.926, .035], [.94, .043], [.946, .059],
    [.942, .072], [.936, .085], [.938, .104], [.944, .126], [.94, .143],
    [.929, .151], [.916, .144], [.91, .127], [.913, .108], [.911, .091],
    [.904, .078], [.896, .069], [.894, .061], [.897, .055], [.9, .052],
  ],
  [
    [.9, .048], [.911, .036], [.928, .035], [.943, .045], [.949, .066],
    [.941, .094], [.936, .132], [.949, .17], [.979, .203], [.991, .244],
    [.973, .286], [.929, .309], [.874, .302], [.838, .274], [.842, .237],
    [.875, .211], [.898, .182], [.902, .139], [.895, .094], [.894, .064],
  ],
  [
    [.894, .044], [.911, .031], [.932, .034], [.949, .051], [.953, .084],
    [.942, .129], [.955, .175], [1.015, .214], [1.049, .286], [1.022, .374],
    [.955, .427], [.843, .449], [.731, .42], [.679, .353], [.704, .291],
    [.788, .262], [.856, .215], [.884, .164], [.884, .105], [.886, .065],
  ],
  [
    [.884, .039], [.907, .024], [.937, .03], [.958, .055], [.96, .101],
    [.945, .154], [.982, .209], [1.071, .266], [1.09, .391], [1.035, .527],
    [.92, .598], [.752, .607], [.578, .558], [.487, .46], [.508, .36],
    [.627, .307], [.76, .269], [.846, .202], [.866, .13], [.872, .072],
  ],
  [
    [.86, .021], [.905, .003], [.956, .018], [.986, .064], [.978, .132],
    [.96, .2], [1.044, .256], [1.139, .363], [1.13, .542], [1.054, .718],
    [.872, .81], [.625, .816], [.365, .744], [.184, .609], [.211, .448],
    [.351, .337], [.568, .288], [.75, .212], [.817, .123], [.842, .057],
  ],
  [
    [.74, -.072], [.91, -.09], [1.085, -.038], [1.15, .09], [1.105, .234],
    [1.164, .39], [1.18, .59], [1.104, .866], [.88, 1.071], [.57, 1.11],
    [.247, 1.038], [-.016, .866], [-.116, .627], [-.093, .389], [.034, .206],
    [.214, .111], [.438, .071], [.596, .014], [.654, -.041], [.697, -.067],
  ],
  [
    [.42, -.16], [.78, -.18], [1.14, -.15], [1.19, .08], [1.14, .3],
    [1.19, .57], [1.16, .91], [1.04, 1.16], [.66, 1.19], [.31, 1.14],
    [-.08, 1.19], [-.18, .98], [-.15, .68], [-.19, .35], [-.14, .04],
    [.03, -.14], [.16, -.18], [.25, -.14], [.31, -.17], [.36, -.16],
  ],
  [
    [.36, -.19], [.76, -.2], [1.17, -.17], [1.21, .12], [1.17, .42],
    [1.21, .74], [1.17, 1.17], [.75, 1.21], [.37, 1.17], [-.17, 1.21],
    [-.21, .91], [-.18, .61], [-.22, .28], [-.18, -.18], [.03, -.21],
    [.15, -.18], [.22, -.21], [.27, -.18], [.31, -.2], [.34, -.19],
  ],
];

const ORIGIN_WEIGHTS = [1, 1, .92, .72, .5, .22, 0, 0, 0];

function smoothClosedPath(points: readonly Point[]) {
  const last = points[points.length - 1];
  const start: Point = [(last[0] + points[0][0]) / 2, (last[1] + points[0][1]) / 2];
  const commands = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    const midpoint: Point = [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2];
    return `Q ${point[0].toFixed(4)} ${point[1].toFixed(4)} ${midpoint[0].toFixed(4)} ${midpoint[1].toFixed(4)}`;
  });

  return `M ${start[0].toFixed(4)} ${start[1].toFixed(4)} ${commands.join(" ")} Z`;
}

function buildPathStates(origin: InkOrigin) {
  const deltaX = origin.x - .92;
  const deltaY = origin.y - .052;

  return INK_OUTLINES.map((outline, stateIndex) => {
    const weight = ORIGIN_WEIGHTS[stateIndex];
    return smoothClosedPath(
      outline.map(([x, y]) => [
        x + deltaX * weight,
        y + deltaY * weight,
      ] as Point),
    );
  });
}

export function InkTransition({
  direction,
  origin,
  onCommit,
  onComplete,
  sourceTheme,
  targetTheme,
}: InkTransitionProps) {
  const clipRef = useRef<SVGClipPathElement>(null);
  const commitRef = useRef(onCommit);
  const completeRef = useRef(onComplete);
  const paths = useMemo(() => buildPathStates(origin), [origin]);
  const orderedPaths = direction === "forward" ? paths : [...paths].reverse();

  useEffect(() => {
    commitRef.current = onCommit;
    completeRef.current = onComplete;
  }, [onCommit, onComplete]);

  useLayoutEffect(() => {
    const source = document.querySelector<HTMLElement>("[data-theme-content]");
    if (!source) {
      commitRef.current();
      completeRef.current();
      return;
    }

    let cancelled = false;
    let committed = false;
    let finishFrame: number | null = null;
    let settleFrame: number | null = null;
    let previewAnimations: Animation[] = [];
    const preview = document.createElement("div");
    const previewScroll = document.createElement("div");

    preview.className = "ink-preview";
    preview.dataset.direction = direction;
    preview.dataset.previewTheme = direction === "forward" ? targetTheme : sourceTheme;
    preview.setAttribute("aria-hidden", "true");
    preview.setAttribute("inert", "");
    previewScroll.className = "ink-preview-scroll";

    const refreshPreviewContent = (animateEntry = false) => {
      previewAnimations.forEach((animation) => animation.cancel());
      const clonedContent = source.cloneNode(true) as HTMLElement;
      clonedContent.removeAttribute("data-theme-content");
      clonedContent.removeAttribute("data-theme-route");
      clonedContent.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      previewScroll.replaceChildren(clonedContent);
      previewAnimations = animateEntry ? animatePageEntry(clonedContent) : [];
    };

    refreshPreviewContent();
    preview.append(previewScroll);
    document.body.append(preview);

    const routeObserver = new MutationObserver((mutations) => {
      const routeContentChanged = mutations.some(
        (mutation) =>
          mutation.type === "childList" ||
          (mutation.type === "attributes" && mutation.attributeName === "data-theme-route"),
      );
      if (routeContentChanged) refreshPreviewContent(true);
    });
    routeObserver.observe(source, {
      attributeFilter: ["data-theme-route"],
      attributes: true,
      childList: true,
      subtree: true,
    });

    document.documentElement.dataset.inkTransition = direction;

    const syncScroll = () => {
      previewScroll.style.transform = `translate3d(0, ${-window.scrollY}px, 0)`;
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });

    if (direction === "reverse") {
      commitRef.current();
      committed = true;
    }

    const startFrame = window.requestAnimationFrame(() => {
      if (cancelled) return;
      clipRef.current
        ?.querySelectorAll<BeginableAnimation>("animate")
        .forEach((animation) => animation.beginElement());
    });

    const finishTimer = window.setTimeout(() => {
      if (cancelled) return;
      if (!committed) commitRef.current();
      committed = true;

      // Keep the fully covered preview in place until the committed theme has
      // painted underneath it. Removing both in one task can expose one frame
      // of the source theme while the browser recalculates CSS variables.
      finishFrame = window.requestAnimationFrame(() => {
        settleFrame = window.requestAnimationFrame(() => {
          if (cancelled) return;
          routeObserver.disconnect();
          preview.remove();
          window.removeEventListener("scroll", syncScroll);
          delete document.documentElement.dataset.inkTransition;
          completeRef.current();
        });
      });
    }, INK_DURATION_MS);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(startFrame);
      if (finishFrame !== null) window.cancelAnimationFrame(finishFrame);
      if (settleFrame !== null) window.cancelAnimationFrame(settleFrame);
      window.clearTimeout(finishTimer);
      window.removeEventListener("scroll", syncScroll);
      routeObserver.disconnect();
      previewAnimations.forEach((animation) => animation.cancel());
      preview.remove();
      delete document.documentElement.dataset.inkTransition;
    };
  }, [direction, sourceTheme, targetTheme]);

  return (
    <div aria-hidden="true" className="ink-transition-defs">
      <svg className="ink-clip-defs" focusable="false">
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id="ink-theme-clip" ref={clipRef}>
            <path d={orderedPaths[0]}>
              <animate
                attributeName="d"
                begin="indefinite"
                calcMode="linear"
                dur="1.8s"
                fill="freeze"
                keyTimes={direction === "forward" ? PATH_TIMES_FORWARD : PATH_TIMES_REVERSE}
                values={orderedPaths.join(";")}
              />
            </path>
          </clipPath>
        </defs>
      </svg>
      <span
        className="ink-jar-flight"
        data-direction={direction}
        style={{
          left: `calc(${origin.x * 100}vw - 18px)`,
          top: `calc(${origin.y * 100}vh - 43px)`,
        }}
      >
        <InkJarImage
          className="ink-jar-flight-image"
          state={direction === "forward" ? "filled" : "empty"}
        />
      </span>
    </div>
  );
}
