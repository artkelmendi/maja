import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the Albanian restaurant site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="sq">/i);
  assert.match(html, /<title>Maja e Strellcit \| Restorant &amp; Akomodim<\/title>/i);
  assert.match(html, /Mbi re\./);
  assert.match(html, /Afër rrënjëve\./);
  assert.match(html, /\+383 \(0\)49 840 222/);
  assert.match(html, /class="page-intro"/);
  assert.match(html, /data-reveal/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("creates a self-contained GitHub Pages export", async () => {
  const [html, css, motion] = await Promise.all([
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../docs/motion.js", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<base href="\/maja\/">/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="motion\.js"/);
  assert.match(html, /src="images\/maja-hero\.webp"/);
  assert.doesNotMatch(html, /(?:src|href)="\/(?:assets|images)\//);
  assert.doesNotMatch(html, /localhost/);

  assert.match(css, /intro-first/);
  assert.match(css, /motion-enabled/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion/);

  await Promise.all([
    access(new URL("../docs/.nojekyll", import.meta.url)),
    access(new URL("../docs/favicon.png", import.meta.url)),
    access(new URL("../docs/og.png", import.meta.url)),
    access(new URL("../docs/images/maja-food.webp", import.meta.url)),
    access(new URL("../docs/images/maja-room.webp", import.meta.url)),
  ]);
});
