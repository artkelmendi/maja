import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docs = path.join(root, "docs");
const manifestPath = path.join(root, "dist", "client", ".vite", "manifest.json");
const sourceMotion = path.join(root, "scripts", "github-pages-motion.js");

if (path.dirname(docs) !== root) {
  throw new Error("Refusing to write outside the project directory.");
}

const response = await fetch("http://localhost:3000/");
if (!response.ok) {
  throw new Error(`Local site returned ${response.status}.`);
}

let html = await response.text();
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const cssAssetFromManifest = Object.values(manifest)
  .flatMap((entry) => entry.css ?? [])
  .find((asset) => asset.endsWith(".css"));
const cssAsset =
  cssAssetFromManifest ??
  `assets/${fs
    .readdirSync(path.join(root, "dist", "client", "assets"))
    .find((asset) => asset.endsWith(".css"))}`;

if (cssAsset.endsWith("undefined")) {
  throw new Error("Could not find the built stylesheet.");
}

fs.rmSync(docs, { recursive: true, force: true });
fs.mkdirSync(path.join(docs, "images"), { recursive: true });

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*(?:modulepreload|\/assets\/)[^>]*>/gi, "")
  .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "")
  .replaceAll('src="/images/', 'src="images/')
  .replaceAll('href="/images/', 'href="images/')
  .replaceAll('href="/favicon.png"', 'href="favicon.png"')
  .replaceAll('href="/favicon.svg"', 'href="favicon.png"')
  .replaceAll("http://localhost:3000/og.png", "https://artkelmendi.github.io/maja/og.png")
  .replace(
    "</head>",
    `<base href="/maja/">
    <link rel="canonical" href="https://artkelmendi.github.io/maja/">
    <link rel="stylesheet" href="styles.css">
    <script>(function(){try{var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('maja-intro-seen');if(!reduced&&!seen){document.documentElement.classList.add('intro-first');sessionStorage.setItem('maja-intro-seen','1');}}catch(e){}})();</script>
  </head>`,
  )
  .replace("</body>", '<script src="motion.js" defer></script></body>');

fs.writeFileSync(path.join(docs, "index.html"), html);
fs.copyFileSync(path.join(root, "dist", "client", cssAsset), path.join(docs, "styles.css"));
fs.copyFileSync(sourceMotion, path.join(docs, "motion.js"));
fs.copyFileSync(path.join(root, "public", "favicon.png"), path.join(docs, "favicon.png"));
fs.copyFileSync(path.join(root, "public", "og.png"), path.join(docs, "og.png"));
fs.cpSync(path.join(root, "public", "images"), path.join(docs, "images"), {
  recursive: true,
});
fs.writeFileSync(path.join(docs, ".nojekyll"), "");

console.log(`GitHub Pages export created at ${docs}`);
