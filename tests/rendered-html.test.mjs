import assert from "node:assert/strict";
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
  assert.match(html, /Artist and developer exploring observation/);
  assert.doesNotMatch(html, /portfolio-paths|Selected practice|Spatial Inventory System/);
});

test("art presents one combined gallery", async () => {
  const response = await render("/art");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sketches &amp; Paintings/);
  assert.match(html, /12(?:<!-- -->)? works/);
  assert.match(html, /data-slug="desert-haircut"/);
  assert.match(html, /data-featured="true"/);
  assert.match(html, /type="button"/);
  assert.doesNotMatch(html, /Photography|Skeleton Study|Space Figure/);
});

test("gallery and artwork detail routes render", async () => {
  const galleryResponse = await render("/art");
  assert.equal(galleryResponse.status, 200);
  const gallery = await galleryResponse.text();
  assert.match(gallery, /data-slug="desert-haircut"/);
  assert.match(gallery, /\/art\/painting-05-rollercoaster\.jpg/);

  const detailResponse = await render("/art/paintings/praying-mantises");
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /Praying Mantises/);
  assert.match(detail, /Back to Sketches &amp; Paintings/);
});

test("projects route presents BetterBoxd without external navigation", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /BetterBoxd/);
  assert.match(html, /Brief description/);
  assert.match(html, /Tools \/ Software/);
  assert.match(html, /Placeholder content pending/);
  assert.match(html, /type="button"/);
  assert.doesNotMatch(html, /href="https?:\/\/[^"]*betterboxd/i);
  assert.doesNotMatch(html, /Spatial Inventory System/);
});
