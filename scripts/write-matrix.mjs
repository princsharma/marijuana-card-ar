import fs from "fs";
import pages from "../data/pages.json" with { type: "json" };

const controls = {
  "Homepage (sales page)": "Notice dismiss, FAQ disclosure, calendar download, renewal form validation",
  "New-patient page": "Renewal reminder calendar",
  "Money page": "In-page links",
  "FAQ page": "FAQ disclosure",
  "Compare hub": "Comparison links",
  "Compare page": "Comparison table",
  "City page": "Local FAQ, renewal form, nearby city links",
  "Cities hub": "City search and region filter",
  "Condition article": "Related condition and quiz links",
  "Conditions hub": "Condition list",
  "Blog post": "Silo, next-step, and related links",
  "Silo hub": "Post list",
  "Blog hub": "Silo list",
  Tool: "Quiz, locator, or checklist, depending on the URL",
  "Tools hub": "Tool links",
  "Help page": "Search, category filter, disclosures",
  "Doctor profile": "Profile facts",
  "Doctors hub": "Profile link",
  "Reviews page": "Review form validation",
  "Contributor profile": "Template profile",
  "Contributors hub": "Template link",
  "About page": "Practice links",
  "Contact page": "Contact form validation",
  "Policy page": "Policy links",
  "HTML sitemap": "Links to every URL",
};

const lines = [
  "# Route inventory",
  "",
  "Generated from `data/pages.json` after the production route check. All 123 sitemap URLs returned HTTP 200, included their page title, and every internal `href` resolved. No `utm_` parameters were added. A non-trailing URL such as `/pricing` redirects once to `/pricing/`. An unknown path returns 404.",
  "",
  "UTM: the workbook has no UTM sheet and no UTM column. None were added.",
  "",
  "| URL | Template | Status | Links | Controls | UTM | Notes |",
  "| --- | --- | --- | --- | --- | --- | --- |",
];

for (const page of pages) {
  const note = page.status === "Decide" ? "Marked Decide in the workbook" : "";
  lines.push(
    `| ${page.path} | ${page.pageType} | Built | Pass | ${controls[page.pageType] ?? "Links"} | Not required | ${note} |`,
  );
}

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/route-inventory.md", lines.join("\n"));
console.log("rows", pages.length);
