"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { InkJar } from "./ink-jar";
import {
  InkTransition,
  type InkDirection,
  type InkOrigin,
  type PortfolioTheme,
} from "./ink-transition";
import { animatePageEntry } from "./page-entry";

type ActiveTransition = {
  direction: InkDirection;
  id: number;
  origin: InkOrigin;
  sourceTheme: PortfolioTheme;
  targetTheme: PortfolioTheme;
};

type ThemeContextValue = {
  theme: PortfolioTheme;
  transitionDirection: InkDirection | null;
  toggleTheme: (origin: InkOrigin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): PortfolioTheme {
  const storedTheme = window.localStorage.getItem("portfolio-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<PortfolioTheme>("light");
  const [transition, setTransition] = useState<ActiveTransition | null>(null);
  const transitionId = useRef(0);

  const commitTheme = useCallback((nextTheme: PortfolioTheme) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }, []);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    document.documentElement.dataset.theme = initialTheme;
    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-theme-content]");
    if (!page) return;

    const animations = animatePageEntry(page);

    return () => animations.forEach((animation) => animation.cancel());
  }, [pathname]);

  function toggleTheme(origin: InkOrigin) {
    if (transition) return;

    const targetTheme: PortfolioTheme = theme === "light" ? "dark" : "light";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsSvgClip = CSS.supports("clip-path", "url(#ink-theme-clip)");

    if (prefersReducedMotion || !supportsSvgClip) {
      document.documentElement.dataset.simpleThemeTransition = "true";
      commitTheme(targetTheme);
      window.setTimeout(() => {
        delete document.documentElement.dataset.simpleThemeTransition;
      }, 240);
      return;
    }

    transitionId.current += 1;
    setTransition({
      direction: targetTheme === "dark" ? "forward" : "reverse",
      id: transitionId.current,
      origin,
      sourceTheme: theme,
      targetTheme,
    });
  }

  const transitionDirection = transition?.direction ?? null;

  return (
    <ThemeContext.Provider value={{ theme, transitionDirection, toggleTheme }}>
      <div className="theme-content" data-theme-content data-theme-route={pathname}>
        {children}
      </div>
      {transition ? (
        <InkTransition
          direction={transition.direction}
          key={transition.id}
          onCommit={() => commitTheme(transition.targetTheme)}
          onComplete={() => setTransition(null)}
          origin={transition.origin}
          sourceTheme={transition.sourceTheme}
          targetTheme={transition.targetTheme}
        />
      ) : null}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeToggle must be used inside ThemeProvider");

  const { theme, transitionDirection, toggleTheme } = context;
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      aria-busy={transitionDirection ? "true" : undefined}
      aria-label={`Switch to ${nextTheme} mode`}
      className="theme-toggle"
      data-theme-toggle
      disabled={transitionDirection !== null}
      onClick={(event) => {
        const jar = event.currentTarget.querySelector<HTMLElement>(".theme-jar");
        const rect = jar?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: Math.min(.97, Math.max(.03, (rect.left + rect.width / 2) / window.innerWidth)),
          y: Math.min(.22, Math.max(.025, rect.bottom / window.innerHeight)),
        });
      }}
      type="button"
    >
      <InkJar state={theme === "light" ? "filled" : "empty"} />
    </button>
  );
}
