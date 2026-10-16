import fs from "fs";
import path from "path";
import os from "os";

const dumpPath = path.join(os.tmpdir(), "arkansas-sitemap-dump.txt");
const text = fs.readFileSync(dumpPath, "utf8");
const start = text.indexOf("========== SHEET: All URLs");
const end = text.indexOf("========== SHEET:", start + 20);
if (start < 0 || end < 0) throw new Error("All URLs sheet not found in dump");
const section = text.slice(start, end);
const pages = [];

for (const line of section.split(/\r?\n/)) {
  if (!/^\s*\d+\s+\|/.test(line)) continue;
  const parts = line.split(" | ").map((part) => part.trim());
  if (parts[2] === "Tab") continue;
  if (parts.length < 19) {
    console.error("short row", parts.length, line.slice(0, 120));
    continue;
  }
  const [
    ,
    id,
    tab,
    sectionName,
    pageType,
    contentType,
    secondaryType,
    funnel,
    title,
    urlPath,
    keyword,
    keywordCheck,
    ,
    parent,
    ...rest
  ] = parts;
  const phase = rest[rest.length - 1];
  const status = rest[rest.length - 2];
  const schema = rest[rest.length - 3];
  const linksTo = rest[rest.length - 4];
  const covers = rest.slice(0, rest.length - 4).join(" | ");
  pages.push({
    id: Number(id),
    tab,
    section: sectionName,
    pageType,
    contentType,
    secondaryType,
    funnel,
    title,
    path: urlPath,
    keyword,
    keywordCheck,
    parent,
    covers,
    linksTo,
    schema,
    status,
    phase,
  });
}

const byPath = new Map(pages.map((page) => [page.path, page]));
const missingParents = pages.filter(
  (page) => page.parent !== "-" && !byPath.has(page.parent),
);
if (missingParents.length) {
  console.error(missingParents.map((page) => [page.path, page.parent]));
  throw new Error("Missing parents");
}

const out = path.join(process.cwd(), "data", "pages.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(pages, null, 2));
console.log("pages", pages.length, "decide", pages.filter((p) => p.status === "Decide").length);
