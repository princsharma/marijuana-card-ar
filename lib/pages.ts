import pagesJson from "@/data/pages.json";
import type { SitePage } from "@/lib/types";

export const pages = pagesJson as SitePage[];

const byPath = new Map(pages.map((page) => [page.path, page]));

export function getPage(path: string) {
  return byPath.get(path);
}

export function childrenOf(path: string) {
  return pages.filter((page) => page.parent === path);
}

export function pagesInTab(tab: string) {
  return pages.filter((page) => page.tab === tab);
}

export function templateFor(page: SitePage) {
  switch (page.pageType) {
    case "Homepage (sales page)":
      return "Homepage";
    case "New-patient page":
      return "New patients";
    case "Money page":
    case "FAQ page":
      return "Sales page";
    case "Compare hub":
    case "Compare page":
      return "Comparison";
    case "Doctors hub":
    case "Doctor profile":
      return "Doctor";
    case "Reviews page":
      return "Reviews";
    case "Contributors hub":
    case "Contributor profile":
      return "Contributor";
    case "Help page":
      return "Help";
    case "Blog hub":
    case "Silo hub":
      return "Blog hub";
    case "Blog post":
      return "Blog post";
    case "Tools hub":
    case "Tool":
      return "Tool";
    case "Conditions hub":
      return "Conditions hub";
    case "Condition article":
      return "Condition";
    case "Cities hub":
    case "City page":
      return "City";
    case "About page":
    case "Contact page":
      return "Company";
    case "Policy page":
      return "Policy";
    case "HTML sitemap":
      return "HTML sitemap";
    default:
      return page.pageType;
  }
}

export function crumbsFor(page: SitePage) {
  const chain: SitePage[] = [];
  let current: SitePage | undefined = page;
  const seen = new Set<string>();
  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    chain.unshift(current);
    if (current.parent === "-" || !current.parent) break;
    current = byPath.get(current.parent);
  }
  const crumbs = chain.map((item) => ({
    href: item.path,
    label: item.path === "/" ? "Home" : item.title,
  }));
  if (crumbs[0]?.href !== "/") crumbs.unshift({ href: "/", label: "Home" });
  return crumbs;
}
