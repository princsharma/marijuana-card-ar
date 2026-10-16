import fs from "fs";
import pages from "../data/pages.json" with { type: "json" };

const base = process.env.QA_BASE || "http://127.0.0.1:3456";
const failures = [];
const hrefs = new Map();

function normalize(url) {
  const parsed = new URL(url, base);
  if (parsed.origin !== new URL(base).origin) return { external: parsed.href };
  let path = parsed.pathname;
  if (path.length > 1 && !path.endsWith("/")) path += "/";
  return { path, hash: parsed.hash, search: parsed.search };
}

async function get(path, redirects = 0) {
  const response = await fetch(base + path, { redirect: "manual" });
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    const location = response.headers.get("location");
    if (!location) return { status: response.status, hops: redirects, body: "", final: path };
    if (redirects > 2) return { status: response.status, hops: redirects, body: "", final: location, loop: true };
    const next = new URL(location, base);
    const nextPath = next.pathname + next.search;
    return get(nextPath, redirects + 1);
  }
  const body = await response.text();
  return { status: response.status, hops: redirects, body, final: path };
}

for (const page of pages) {
  const result = await get(page.path);
  if (result.status !== 200) failures.push(`${page.path} status ${result.status}`);
  if (result.hops > 1) failures.push(`${page.path} redirect hops ${result.hops}`);
  if (!result.body.includes(page.title)) failures.push(`${page.path} missing title`);
  if (/utm_/i.test(result.body)) failures.push(`${page.path} contains UTM`);
  const found = [...result.body.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  hrefs.set(page.path, found);
}

const known = new Set(pages.map((page) => page.path));
known.add("/sitemap.xml");
known.add("/robots.txt");

for (const [from, list] of hrefs) {
  for (const href of list) {
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
    if (href.startsWith("/_next/") || href.includes("favicon") || href.startsWith("/icon")) continue;
    const target = normalize(href);
    if (target.external) continue;
    if (target.search && /utm_/i.test(target.search)) failures.push(`${from} -> ${href} has UTM`);
    if (!known.has(target.path) && target.path !== "/api/booking/" && target.path !== "/api/contact/" && target.path !== "/api/review/") {
      failures.push(`${from} -> ${target.path} missing`);
    }
  }
}

const bare = await get("/pricing");
if (bare.hops !== 1 || bare.status !== 200) failures.push(`bare /pricing hops ${bare.hops} status ${bare.status}`);
const missing = await get("/not-a-real-page/");
if (missing.status !== 404) failures.push(`unknown route status ${missing.status}`);

const report = {
  pages: pages.length,
  failures,
};
fs.writeFileSync("docs/qa-routes.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: pages.length, failures: failures.length, sample: failures.slice(0, 30) }, null, 2));
if (failures.length) process.exitCode = 1;
