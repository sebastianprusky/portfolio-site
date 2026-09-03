import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(pathname) {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("home presents a minimal portfolio introduction", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sebastian Prusky Portfolio/);
  assert.match(html, /href="\/art"/);
  assert.match(html, /href="\/projects"/);
  assert.equal((html.match(/rel="prefetch"/g) ?? []).length, 12);
  assert.match(html, /\/art\/painting-01-desert-haircut-thumb\.webp/);
  assert.match(html, /\/art\/sketch-09-blueberries-thumb\.webp/);
  assert.match(html, /exploring tech, product design, and art/);
  assert.doesNotMatch(html, /Hello, I(?:&#x27;|&apos;)m|Rearrange|Reset/);
  assert.doesNotMatch(html, /<a[^>]+href="\/"[^>]*>Home<\/a>/);
  assert.doesNotMatch(html, /portfolio-paths|Selected practice|Spatial Inventory System/);
});

test("home scramble and ink transition stay deterministic and accessible", async () => {
  const homeSource = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  const scrambleSource = await readFile(
    new URL("../app/scramble-heading.tsx", import.meta.url),
    "utf8",
  );
  const inkSource = await readFile(
    new URL("../app/ink-transition.tsx", import.meta.url),
    "utf8",
  );
  const themeSource = await readFile(
    new URL("../app/theme.tsx", import.meta.url),
    "utf8",
  );
  const pageEntrySource = await readFile(
    new URL("../app/page-entry.ts", import.meta.url),
    "utf8",
  );
  const jarSource = await readFile(
    new URL("../app/ink-jar.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(homeSource, /Sebastian Prusky Portfolio/);
  assert.doesNotMatch(homeSource, /HOME_ARRANGEMENTS|rearrangeHome|home-graphic/);
  assert.match(scrambleSource, /const SYMBOLS/);
  assert.match(scrambleSource, /const step = 5 \+ \(index % 3\)/);
  assert.match(scrambleSource, /prefers-reduced-motion: reduce/);
  assert.match(scrambleSource, /autoPlay = false/);
  assert.match(scrambleSource, /if \(run === 0\) return/);
  assert.match(scrambleSource, /setRun\(0\)/);
  assert.match(scrambleSource, /setRun\(\(currentRun\) => currentRun \+ 1\)/);
  assert.match(homeSource, /key="home-heading"/);
  assert.match(scrambleSource, /<h1 aria-label=\{children\} className=\{className\} id=\{id\}>/);
  assert.match(scrambleSource, /aria-label=\{`Replay \$\{children\} animation`\}/);
  assert.match(scrambleSource, /className=\{triggerClassName\}/);
  assert.doesNotMatch(scrambleSource, /Math\.random/);
  assert.match(homeSource, /accentLastWord autoPlay/);
  assert.match(inkSource, /const INK_OUTLINES/);
  assert.match(inkSource, /attributeName="d"/);
  assert.match(inkSource, /dur="1\.8s"/);
  assert.match(inkSource, /calcMode="linear"/);
  assert.doesNotMatch(inkSource, /<ellipse|dropletRx|dropletRy|dropletTimes/);
  assert.match(inkSource, /cloneNode/);
  assert.match(inkSource, /new MutationObserver/);
  assert.match(inkSource, /attributeFilter: \["data-theme-route"\]/);
  assert.match(inkSource, /refreshPreviewContent\(\)/);
  assert.match(inkSource, /addEventListener\("scroll", syncScroll/);
  assert.match(inkSource, /translate3d\(0, \$\{-window\.scrollY\}px, 0\)/);
  assert.match(inkSource, /finishFrame = window\.requestAnimationFrame\(\(\) => \{/);
  assert.match(inkSource, /settleFrame = window\.requestAnimationFrame\(\(\) => \{/);
  assert.match(
    inkSource,
    /commitRef\.current\(\)[\s\S]*finishFrame = window\.requestAnimationFrame[\s\S]*preview\.remove\(\)/,
  );
  assert.doesNotMatch(themeSource, /startViewTransition/);
  assert.match(themeSource, /data-theme-route=\{pathname\}/);
  assert.match(themeSource, /usePathname\(\)/);
  assert.match(themeSource, /animatePageEntry\(page\)/);
  assert.doesNotMatch(themeSource, /dataset\.inkTransition\) return/);
  assert.match(pageEntrySource, /animateElements\('\[data-page-enter="title"\]', 12, 400, 0\)/);
  assert.match(pageEntrySource, /animateElements\('\[data-page-enter="content"\]', 16, 500, 70\)/);
  assert.match(pageEntrySource, /prefers-reduced-motion: reduce/);
  assert.match(inkSource, /refreshPreviewContent\(true\)/);
  assert.match(inkSource, /animatePageEntry\(clonedContent\)/);
  assert.match(homeSource, /className="home-intro-copy" data-page-enter="title"/);
  assert.match(homeSource, /pageEnter="content"/);
  assert.doesNotMatch(themeSource, /<span>\{nextTheme\} mode<\/span>/);
  assert.match(jarSource, /\/ink-jar-filled\.png/);
  assert.match(jarSource, /\/ink-jar-empty\.png/);
  assert.match(styles, /--background: #f2f0e7/);
  assert.match(styles, /--background: #101113/);
  assert.match(styles, /--accent: #343f75/);
  assert.match(styles, /--accent: #90bed8/);
  assert.match(styles, /\.scramble-word-portfolio[\s\S]*color: var\(--accent\)/);
  assert.match(styles, /\.scramble-word-name[\s\S]*color: var\(--foreground\)/);
  assert.match(styles, /\.scramble-character \{\s*position: relative;\s*display: inline-block/);
  assert.match(styles, /\.scramble-glyph \{\s*position: absolute;\s*inset: 0;/);
  assert.match(styles, /\.home-intro h1 \{[\s\S]*?font-size: clamp\(7rem, min\(28svh, 18vw\), 21rem\)/);
  assert.match(styles, /\.home-intro h1 \.scramble-trigger \{[\s\S]*?margin-left: -0\.028em/);
  assert.match(styles, /\.home-description[\s\S]*color: var\(--foreground\)/);
  assert.doesNotMatch(styles, /\.works-count/);
  assert.doesNotMatch(styles, /\.gallery-title span/);
  assert.match(styles, /\.artwork-link > span[\s\S]*?color: #fff/);
  assert.match(styles, /\.artwork-grid \{[\s\S]*?gap: clamp\(8px, 0\.8vw, 12px\)/);
  assert.match(styles, /\.gallery-header \{[\s\S]*?padding: clamp\(28px, 4vw, 56px\) clamp\(20px, 5vw, 76px\) clamp\(34px, 5vw, 72px\)/);
  assert.match(styles, /\.gallery-header h1,\s*\.projects-header h1,\s*\.about-layout h1 \{\s*text-transform: none;/);
  assert.match(styles, /\.artwork-grid \{[\s\S]*?padding: clamp\(16px, 2\.4vw, 36px\)/);
  assert.match(styles, /\.artwork-column \{[\s\S]*?gap: clamp\(8px, 0\.8vw, 12px\)/);
  assert.match(styles, /\.artwork-link \{[\s\S]*?border-radius: 0/);
  assert.match(styles, /\.artwork-lightbox \{[\s\S]*?border-radius: 0/);
  assert.match(styles, /\.lightbox-image img \{[\s\S]*?border-radius: 0/);
  assert.match(styles, /\.ink-preview-scroll/);
  assert.doesNotMatch(styles, /\.home-graphic|\.rearrange-button|\.reset-button/);
  assert.doesNotMatch(styles, /\.home-section-nav a[\s\S]*?text-shadow/);
  assert.match(styles, /\.ink-preview\[data-preview-theme="light"\]/);
  assert.doesNotMatch(styles, /\.ink-spill-shape-main/);
});

test("inner pages include Home navigation without underline hover rules", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<a[^>]+href="\/"[^>]*>Home<\/a>/);

  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(styles, /\.home-link::after/);
  assert.doesNotMatch(styles, /\.home-section-nav a::after/);
  assert.match(styles, /\.home-section-nav a[\s\S]*color: var\(--foreground\)/);
  assert.match(styles, /\.home-link,\s*\.site-header nav a \{\s*font-weight: 600;/);
  assert.match(styles, /\.home-link:hover,[\s\S]*?font-weight: 700;/);
  assert.match(styles, /grid-template-columns: auto minmax\(0, 1fr\) auto/);
  assert.match(styles, /\.site-header nav[\s\S]*justify-self: end/);

  const projectsSource = await readFile(
    new URL("../app/projects/page.tsx", import.meta.url),
    "utf8",
  );
  const artSource = await readFile(
    new URL("../app/art/page.tsx", import.meta.url),
    "utf8",
  );
  const aboutSource = await readFile(
    new URL("../app/about/page.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(projectsSource, /ScrambleHeading/);
  assert.doesNotMatch(artSource, /ScrambleHeading/);
  assert.doesNotMatch(aboutSource, /ScrambleHeading/);
  assert.match(projectsSource, /<h1 id="projects-heading">Projects<\/h1>/);
  assert.match(artSource, /<h1 className="gallery-title" id="art-heading">/);
  assert.match(styles, /\.projects-header \{[\s\S]*?padding: clamp\(28px, 4vw, 56px\)/);
  assert.match(aboutSource, /<h1 className="about-heading" id="about-heading">/);
});

test("about centers the name without a redundant eyebrow", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="about-heading"/);
  assert.doesNotMatch(html, /Replay Sebastian Prusky animation/);
  assert.match(html, /class="about-northwestern-trigger"/);
  assert.match(html, /Northwestern University/);
  assert.match(html, /class="about-miami-trigger"/);
  assert.match(html, /class="about-chicago-trigger"/);
  assert.doesNotMatch(html, /class="scramble-character"/);
  assert.match(html, /miami, fl/);
  assert.match(html, /chicago, il/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /class="about-email"/);
  assert.doesNotMatch(html, /mailto:sebastianprusky2028@u\.northwestern\.edu/);
  assert.match(html, /aria-label="GitHub"/);
  assert.match(html, /aria-label="LinkedIn"/);
  assert.doesNotMatch(html, />GitHub<|>LinkedIn</);
  assert.doesNotMatch(html, /class="page-kicker">About/);
  assert.match(html, /id="recently-heading">Recently/);
  assert.match(html, /Updated (?:<!-- -->)?August 2026/);
  assert.match(html, /href="https:\/\/espanso\.org\/"/);
  assert.match(html, /Normal People/);
  assert.match(html, /www\.google\.com\/search\?q=Normal\+People\+Sally\+Rooney/);
  assert.match(html, /Purple/);

  const recentlySource = await readFile(
    new URL("../app/recently-data.ts", import.meta.url),
    "utf8",
  );
  const recentlyComponentSource = await readFile(
    new URL("../app/recently.tsx", import.meta.url),
    "utf8",
  );
  assert.match(recentlySource, /open\.spotify\.com\/embed\/track\/1i2fcqyMYvpvuLyJyOLEAt/);
  assert.match(recentlyComponentSource, /className="recent-embed-card"/);
  assert.match(recentlyComponentSource, /className="recent-preview-card"/);
  assert.doesNotMatch(recentlyComponentSource, /<img|<dialog|"use client"/);

  const clockSource = await readFile(
    new URL("../app/about-clock.tsx", import.meta.url),
    "utf8",
  );
  assert.match(clockSource, /America\/New_York/);
  assert.match(clockSource, /America\/Chicago/);
  assert.match(clockSource, /setInterval\(\(\) => setNow\(new Date\(\)\), 1000\)/);

  const emailSource = await readFile(
    new URL("../app/about-email.tsx", import.meta.url),
    "utf8",
  );
  assert.match(emailSource, /navigator\.clipboard\.writeText\(EMAIL\)/);
  assert.match(emailSource, /fallbackCopyEmail/);
  assert.match(emailSource, /email copied/);
  assert.match(emailSource, /event\.clientX/);
  assert.match(emailSource, /event\.clientY/);
  assert.match(emailSource, /style=\{\{ left: statusPosition\.x, top: statusPosition\.y \}\}/);

  const northwesternSource = await readFile(
    new URL("../app/about-northwestern-easter-egg.tsx", import.meta.url),
    "utf8",
  );
  assert.match(northwesternSource, /const NORTHWESTERN_HOLD_DURATION = 5000/);
  assert.match(northwesternSource, /classList\.add\("is-northwestern"\)/);
  assert.match(northwesternSource, /classList\.remove\("is-northwestern"\)/);
  assert.match(northwesternSource, /classList\.contains\("is-northwestern"\)/);
  assert.match(northwesternSource, /window\.clearTimeout\(restoreTimerRef\.current\)/);

  const miamiSource = await readFile(
    new URL("../app/about-miami-easter-egg.tsx", import.meta.url),
    "utf8",
  );
  assert.match(miamiSource, /const PALM_HOLD_DURATION = 3570/);
  assert.match(miamiSource, /setAnimationRun\(\(currentRun\) => currentRun \+ 1\)/);
  assert.match(miamiSource, /createTreeWalker\(document\.body, NodeFilter\.SHOW_TEXT\)/);
  assert.match(miamiSource, /viewportHeight - contactLinksRect\.bottom - 24/);
  assert.match(miamiSource, /safeHeight \* aspect \* heightFactor/);
  assert.match(miamiSource, /animations\.forEach\(\(animation\) => animation\.reverse\(\)\)/);
  assert.match(miamiSource, /Promise\.all\(animations\.map\(\(animation\) => animation\.finished\)\)/);
  assert.match(miamiSource, /safeHeight \* aspect/);
  assert.match(miamiSource, /miami-palm miami-palm-1/);
  assert.match(miamiSource, /miami-palm miami-palm-4/);
  assert.match(miamiSource, /<NorthwesternEasterEgg \/> in <ChicagoEasterEgg \/>\./);

  const chicagoSource = await readFile(
    new URL("../app/about-chicago-easter-egg.tsx", import.meta.url),
    "utf8",
  );
  assert.match(chicagoSource, /className="chicago-train-track"/);
  assert.match(chicagoSource, /contentTop - headerBottom/);
  assert.match(chicagoSource, /animation\.reverse\(\)/);
  assert.match(chicagoSource, /animation\.finished/);
  assert.match(chicagoSource, /Chicago, IL/);

  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(styles, /\.about-layout h1 \{\s*margin-top: 0;/);
  assert.match(styles, /\.about-heading\.is-northwestern \{\s*color: #4e2a84/);
  assert.match(styles, /\.about-northwestern-trigger:hover,[\s\S]*?color: inherit;[\s\S]*?text-decoration-color: currentColor/);
  assert.match(styles, /\.about-northwestern-trigger \{[\s\S]*?text-decoration-color: currentColor/);
  assert.match(styles, /\.about-miami-trigger \{[\s\S]*?text-decoration-color: currentColor/);
  assert.match(styles, /\.about-chicago-trigger \{[\s\S]*?text-decoration-color: currentColor/);
  assert.doesNotMatch(styles, /\.about-northwestern-trigger:hover,[^}]*#4e2a84/);
  assert.doesNotMatch(styles, /\.about-northwestern-trigger:hover,[^}]*transform: scale/);
  assert.match(styles, /\.miami-palms \{[\s\S]*?color: var\(--foreground\)/);
  assert.match(styles, /aspect-ratio: var\(--palm-aspect\)/);
  assert.match(styles, /--palm-height-factor: 0\.62/);
  assert.match(styles, /--palm-height-factor: 1/);
  assert.match(styles, /mask-image: url\("\/miami-palm-1\.png"\)/);
  assert.match(styles, /mask-image: url\("\/miami-palm-4\.png"\)/);
  assert.match(styles, /mask-image: url\("\/chicago-train\.png"\)/);
  assert.match(styles, /@keyframes chicago-train-drive/);
  assert.match(styles, /@keyframes chicago-train-bounce/);
  assert.doesNotMatch(styles, /\.about-last-name[\s\S]{0,80}color: var\(--accent\)/);
  assert.match(styles, /\.about-locations \{[\s\S]*?color: var\(--accent\)/);
  assert.match(styles, /\.about-clock \{[\s\S]*?color: var\(--foreground\)/);
  assert.match(styles, /\.about-email:hover,[\s\S]*?text-decoration: none;[\s\S]*?transform: scale\(1\.025\)/);
  assert.match(styles, /\.about-email-status\[data-visible="true"\] \{\s*opacity: 1;/);
  assert.match(styles, /\.about-email-status \{\s*position: fixed;/);
  assert.match(styles, /\.contact-links a \{[\s\S]*?color: var\(--foreground\)/);
  assert.match(styles, /\.contact-links a:hover,[\s\S]*?transform: scale\(1\.2\)/);
  assert.match(styles, /mask-image: url\("\/github-icon\.svg"\)/);
  assert.match(styles, /mask-image: url\("\/linkedin-icon\.svg"\)/);
});

test("art presents one combined gallery", async () => {
  const response = await render("/art");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sketches &amp; Paintings/);
  assert.doesNotMatch(html, /Replay Sketches &amp; Paintings animation/);
  assert.doesNotMatch(html, /class="scramble-character"/);
  assert.doesNotMatch(html, /12(?:<!-- -->)? works/);
  assert.match(html, /data-slug="desert-haircut"/);
  assert.match(html, /data-slug="room-study"/);
  assert.match(html, /alt="mr morale &amp; the big steppers"/);
  assert.match(html, />mr morale &amp; the big steppers<\/span>/);
  assert.doesNotMatch(html, /mr morale &amp;amp; the big steppers/);
  assert.doesNotMatch(html, /mr morale &amp;amp;amp; the big steppers/);
  assert.match(html, /data-featured="true"/);
  assert.match(html, /type="button"/);
  assert.doesNotMatch(html, /Photography|Skeleton Study|Space Figure/);
});

test("gallery and artwork detail routes render", async () => {
  const galleryResponse = await render("/art");
  assert.equal(galleryResponse.status, 200);
  const gallery = await galleryResponse.text();
  assert.match(gallery, /data-slug="desert-haircut"/);
  assert.match(gallery, /\/art\/painting-05-rollercoaster-thumb\.webp/);
  assert.match(gallery, /loading="lazy"/);
  assert.doesNotMatch(gallery, /\/art\/painting-05-rollercoaster\.jpg/);

  const bridgeResponse = await render("/art/sketches/bridge-cyclist");
  assert.equal(bridgeResponse.status, 200);
  const bridge = await bridgeResponse.text();
  assert.match(bridge, /watercolor, colored pencil, pen/);

  const restaurantResponse = await render("/art/paintings/restaurant");
  assert.equal(restaurantResponse.status, 200);
  const restaurant = await restaurantResponse.text();
  assert.match(restaurant, /lines in varying directions/);
  assert.doesNotMatch(restaurant, /lines in varying direction,/);

  const detailResponse = await render("/art/paintings/praying-mantises");
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /seaside/);
  assert.match(detail, /Back to Sketches &amp; Paintings/);
  assert.match(detail, /\/art\/painting-03-praying-mantises-display\.webp/);
  assert.match(detail, /width="2200" height="1696"|height="1696" width="2200"/);

  const roomResponse = await render("/art/sketches/room-study");
  assert.equal(roomResponse.status, 200);
  const room = await roomResponse.text();
  assert.match(room, /<title>mr morale &amp; the big steppers \| Sebastian Prusky<\/title>/);
  assert.match(room, /alt="mr morale &amp; the big steppers"/);
  assert.match(room, /<h1>mr morale &amp; the big steppers<\/h1>/);
  assert.doesNotMatch(room, /mr morale &amp;amp; the big steppers/);
  assert.doesNotMatch(room, /mr morale &amp;amp;amp; the big steppers/);
});

test("projects route presents four editorial project cards with project links", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /Replay Projects animation/);
  assert.doesNotMatch(html, /class="scramble-character"/);
  assert.match(html, /PickAMovie/);
  assert.match(html, /HomeMemory/);
  assert.match(html, /Rank Your Meal Exchanges/);
  assert.match(html, /Hexlearn/);
  assert.doesNotMatch(html, /Brief description|Inspiration|Tools \/ Software/);
  assert.match(html, /class="project-card-overlay"/);
  assert.match(html, /A faster way to rank Northwestern dining/);
  assert.match(html, /role="button"/);
  assert.match(html, /\/projects\/betterboxd-dark-preview\.png/);
  assert.match(html, /\/projects\/homememory-dark-preview\.png/);
  assert.match(html, /\/projects\/rank-your-meal-exchanges-preview\.jpg/);
  assert.doesNotMatch(html, /Spatial Inventory System/);

  const projectsSource = await readFile(
    new URL("../app/projects/projects-list.tsx", import.meta.url),
    "utf8",
  );
  assert.match(projectsSource, /type ProjectShowcaseItem/);
  assert.match(projectsSource, /shortSubtitle/);
  assert.match(projectsSource, /appStoreUrl\?: string/);
  assert.match(projectsSource, /className="project-technology-list project-technology-list-modal"/);
  assert.match(projectsSource, /className="project-action-links"/);
  assert.match(projectsSource, /className="project-action-link"/);
  assert.match(projectsSource, /className="project-showcase"/);
  assert.match(projectsSource, /https:\/\/github\.com\/sebastianprusky\/rank-your-meal-exchanges/);
  assert.match(projectsSource, /https:\/\/github\.com\/sebastianprusky\/Hexlearn/);
  assert.match(projectsSource, /https:\/\/github\.com\/sebastianprusky\/pickamovie/);
  assert.match(projectsSource, /https:\/\/github\.com\/cabadie\/justHome/);
  assert.match(projectsSource, /https:\/\/apps\.apple\.com\/us\/app\/homememory\/id6760926658/);
  assert.match(projectsSource, /available as an unlisted iOS app through a direct App Store link/);
  assert.match(projectsSource, /forecast an upcoming loss window/);
  assert.match(projectsSource, /imported Letterboxd history and in-app preference signals/);
  assert.doesNotMatch(projectsSource, /projectSections|briefDescription|liveUrl/);
  assert.match(projectsSource, /Independent project inspired by Beli\. Not affiliated with or endorsed by Beli or Northwestern University\./);
  assert.doesNotMatch(projectsSource, /i-want-to-make-a-better\.vercel\.app/);
});
