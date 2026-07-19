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

test("home presents separate portfolio destinations", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sebastian Prusky/);
  assert.match(html, /href="\/art"/);
  assert.match(html, /href="\/projects"/);
  assert.doesNotMatch(html, /Selected practice|Spatial Inventory System/);
});

test("art landing presents all three categories", async () => {
  const response = await render("/art");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sketches/);
  assert.match(html, /Paintings/);
  assert.match(html, /Photography/);
  assert.match(html, /href="\/art\/sketches"/);
});

test("gallery and artwork detail routes render", async () => {
  const galleryResponse = await render("/art/paintings");
  assert.equal(galleryResponse.status, 200);
  const gallery = await galleryResponse.text();
  assert.match(gallery, /\/art\/paintings\/desert-haircut/);
  assert.match(gallery, /\/art\/painting-05-rollercoaster\.jpg/);

  const detailResponse = await render("/art/sketches/skeleton-study");
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /Skeleton Study/);
  assert.match(detail, /Graphite study/);
});

test("projects route remains intentionally empty", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Work will be added here/);
  assert.doesNotMatch(html, /Spatial Inventory System/);
});
