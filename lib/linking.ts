import { cityFor, nearbyCities } from "@/lib/cities";
import { childrenOf, getPage, pages } from "@/lib/pages";
import type { PlannedLink, SitePage } from "@/lib/types";

const SILO_MONEY: Record<string, string> = {
  "/blog/arkansas-rules/": "/eligibility/",
  "/blog/first-card/": "/new-patients/",
  "/blog/eligibility/": "/tools/do-i-qualify/",
  "/blog/card-renewal/": "/",
  "/blog/patient-rights/": "/eligibility/",
  "/blog/caregivers-and-minors/": "/new-patients/",
  "/blog/dosage-and-usage/": "/tools/dispensary-locator/",
};

const TOOL_POST: Record<string, string> = {
  "/tools/dispensary-locator/": "/blog/dosage-and-usage/first-dispensary-visit/",
  "/tools/do-i-qualify/": "/blog/eligibility/does-anxiety-qualify/",
  "/tools/application-checklist/": "/blog/first-card/application-mistakes/",
};

function titled(href: string, fallback: string) {
  return getPage(href)?.title ?? fallback;
}

function push(links: PlannedLink[], href: string, label: string, slot: PlannedLink["slot"]) {
  if (!getPage(href)) return;
  links.push({ href, label, slot });
}

function siloPath(page: SitePage) {
  if (page.pageType === "Silo hub") return page.path;
  if (page.pageType === "Blog post") return page.parent;
  return null;
}

function postsIn(path: string) {
  return childrenOf(path).filter((item) => item.pageType === "Blog post");
}

function relatedPost(page: SitePage, exclude: string[]) {
  const silo = siloPath(page);
  if (!silo) return undefined;
  const pool = postsIn(silo).filter((item) => item.path !== page.path && !exclude.includes(item.path));
  return (
    pool.find((item) => item.funnel === page.funnel) ??
    pool.find((item) => item.funnel === "MOFU" && page.funnel === "MOFU") ??
    pool[0]
  );
}

export function pageLinks(page: SitePage): PlannedLink[] {
  const links: PlannedLink[] = [];

  if (page.pageType === "Blog post") {
    const silo = page.parent;
    push(links, silo, titled(silo, "Silo"), "intro");
    const next = page.linksTo.trim();
    if (getPage(next)) push(links, next, titled(next, "Next step"), "intro");
    if (page.section.startsWith("3.")) push(links, "/conditions/", "Qualifying conditions", "intro");
    if (page.funnel === "MOFU" || page.funnel === "ReMOFU") {
      const primary = getPage(next) ? next : page.funnel === "ReMOFU" ? "/" : "/new-patients/";
      if (page.funnel !== "ReMOFU" || primary !== "/new-patients/") {
        push(links, primary, `Continue: ${titled(primary, "Next")}`, "end");
      }
    }
    if (page.funnel === "ReMOFU") push(links, "/", "Renew on the homepage", "end");
    const blocked = new Set<string>(["/new-patients/"]);
    if (page.funnel === "ReTOFU" || page.funnel === "ReMOFU") {
      links.splice(0, links.length, ...links.filter((item) => !blocked.has(item.href) || item.href === silo));
    }
    const exclude = links.map((item) => item.href);
    if (page.funnel === "TOFU" || page.funnel === "ReTOFU" || page.funnel === "MOFU") {
      let related = relatedPost(page, exclude);
      if (page.funnel === "MOFU" && related?.funnel !== "MOFU") {
        related = postsIn(silo).find((item) => item.funnel === "MOFU" && item.path !== page.path);
      }
      if (page.funnel === "MOFU" && !related) {
        push(links, "/eligibility/", "Eligibility requirements", "related");
      } else if (related && !(page.funnel === "ReTOFU" && related.path === "/new-patients/")) {
        if (page.funnel !== "ReTOFU" || related.path !== "/new-patients/") {
          push(links, related.path, related.title, "related");
        }
      }
    }
    if (page.funnel === "ReTOFU" || page.funnel === "ReMOFU") {
      return links.filter((item) => item.href !== "/new-patients/");
    }
    return links;
  }

  if (page.pageType === "Silo hub") {
    for (const post of postsIn(page.path)) push(links, post.path, post.title, "list");
    const money = SILO_MONEY[page.path];
    if (money) push(links, money, titled(money, "Next"), "end");
    return links;
  }

  if (page.pageType === "Blog hub") {
    for (const hub of childrenOf("/blog/")) push(links, hub.path, hub.title, "list");
    return links;
  }

  if (page.pageType === "Condition article") {
    push(links, "/conditions/", "All qualifying conditions", "intro");
    push(links, "/tools/do-i-qualify/", "Check whether you qualify", "end");
    const articles = pages.filter((item) => item.pageType === "Condition article");
    const index = articles.findIndex((item) => item.path === page.path);
    const related = articles[(index + 1) % articles.length];
    if (related && related.path !== page.path) push(links, related.path, related.title, "related");
    return links;
  }

  if (page.pageType === "Conditions hub") {
    for (const article of pages.filter((item) => item.pageType === "Condition article")) {
      push(links, article.path, article.title, "list");
    }
    push(links, "/tools/do-i-qualify/", "Do I qualify?", "end");
    return links;
  }

  if (page.pageType === "City page") {
    push(links, "/cities/", "All cities", "intro");
    const city = cityFor(page.path);
    if (city) {
      for (const near of nearbyCities(city)) push(links, near.path, `${near.name} renewal`, "related");
    }
    push(links, "/tools/dispensary-locator/", "Dispensary locator", "end");
    push(links, "/#booking", "Renewal booking", "end");
    return links;
  }

  if (page.pageType === "Cities hub") {
    for (const city of childrenOf("/cities/")) push(links, city.path, city.title, "list");
    return links;
  }

  if (page.pageType === "Compare page") {
    push(links, "/compare/", "All comparisons", "intro");
    push(links, "/pricing/", "Pricing", "intro");
    push(links, "/", "Renewal homepage", "end");
    push(links, "/", "Book a renewal from the homepage", "end");
    return links;
  }

  if (page.pageType === "Compare hub") {
    for (const item of childrenOf("/compare/")) push(links, item.path, item.title, "list");
    push(links, "/pricing/", "Pricing", "end");
    push(links, "/", "Renewal homepage", "end");
    return links;
  }

  if (page.pageType === "Tool") {
    push(links, "/tools/", "All tools", "intro");
    const post = TOOL_POST[page.path];
    if (post) push(links, post, titled(post, "Related guide"), "related");
    if (page.path === "/tools/do-i-qualify/") {
      push(links, "/new-patients/", "First-card rules", "end");
    } else {
      push(links, "/", "Renewal homepage", "end");
    }
    return links;
  }

  if (page.pageType === "Tools hub") {
    for (const tool of childrenOf("/tools/")) push(links, tool.path, tool.title, "list");
    return links;
  }

  if (page.pageType === "Money page" || page.pageType === "FAQ page") {
    const next = page.linksTo.trim();
    if (getPage(next)) {
      push(links, next, titled(next, "Next"), "intro");
      push(links, next, titled(next, "Next"), "end");
    }
    return links;
  }

  if (page.pageType === "New-patient page") {
    push(links, "/tools/do-i-qualify/", "Do I qualify?", "end");
    push(links, "/conditions/", "Qualifying conditions", "related");
    push(links, "/#reminder", "Renewal reminder", "end");
    return links;
  }

  if (page.pageType === "Doctors hub") {
    for (const doctor of childrenOf("/doctors/")) push(links, doctor.path, doctor.title, "list");
    push(links, "/", "Renewal homepage", "end");
    return links;
  }

  if (page.pageType === "Doctor profile") {
    push(links, "/doctors/", "All physicians", "intro");
    push(links, "/", "Renewal homepage", "end");
    return links;
  }

  if (page.pageType === "Reviews page") {
    push(links, "/", "Renewal homepage", "end");
    push(links, "/doctors/", "Physicians", "related");
    return links;
  }

  if (page.pageType === "Contributors hub" || page.pageType === "Contributor profile") {
    if (page.pageType === "Contributor profile") {
      push(links, "/contributors/", "All contributors", "intro");
    } else {
      for (const person of childrenOf("/contributors/")) push(links, person.path, person.title, "list");
    }
    push(links, "/blog/", "Blog", "end");
    return links;
  }

  if (page.pageType === "About page" || page.pageType === "Contact page") {
    push(links, "/", "Renewal homepage", "end");
    push(links, "/doctors/", "Physicians", "related");
    return links;
  }

  if (page.pageType === "Policy page" && page.path === "/policy/") {
    for (const policy of childrenOf("/policy/")) push(links, policy.path, policy.title, "list");
    return links;
  }

  if (page.pageType === "Policy page") {
    push(links, "/policy/", "All policies", "intro");
    return links;
  }

  if (page.pageType === "Help page") {
    push(links, "/faq/", "Shorter FAQ", "related");
    push(links, "/", "Renewal homepage", "end");
    return links;
  }

  if (page.pageType === "HTML sitemap") {
    for (const item of pages) push(links, item.path, item.title, "list");
    return links;
  }

  return links;
}

export function linksInSlot(page: SitePage, slot: PlannedLink["slot"]) {
  return pageLinks(page).filter((item) => item.slot === slot);
}
