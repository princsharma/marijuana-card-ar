import { cityFaqs, cityFor } from "@/lib/cities";
import { DISPENSARIES } from "@/lib/dispensaries";
import { HELP_ITEMS, HOME_FAQS } from "@/lib/help";
import { childrenOf, crumbsFor, pages } from "@/lib/pages";
import { IN_PERSON_OFFERED, PRICES, SITE_NAME, SITE_URL, usd } from "@/lib/site";
import type { SitePage } from "@/lib/types";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const CONTENT_DATE = "2026-10-16";

type Node = Record<string, unknown>;

function abs(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function medicalOrg(): Node {
  return {
    "@type": "MedicalOrganization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    areaServed: "Arkansas",
  };
}

function website(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
  };
}

function crumbList(page: SitePage): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbsFor(page).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: abs(crumb.href),
    })),
  };
}

function faqEntity(items: { question: string; answer: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function itemList(name: string, items: { name: string; url?: string }[]): Node {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    })),
  };
}

function pagesAsItems(list: SitePage[]) {
  return list.map((item) => ({ name: item.title, url: abs(item.path) }));
}

function renewalOffer(price: number, description: string): Node {
  return {
    "@type": "Offer",
    price: String(price),
    priceCurrency: "USD",
    description,
  };
}

function renewalService(name: string, offers: Node | Node[], area?: Node | string): Node {
  return {
    "@type": "Service",
    name,
    serviceType: "Medical marijuana card renewal (telehealth video)",
    areaServed: area ?? "Arkansas",
    provider: { "@id": ORG_ID },
    offers,
  };
}

function medicalPage(page: SitePage, about?: Node | string): Node {
  return {
    "@type": "MedicalWebPage",
    name: page.title,
    url: abs(page.path),
    lastReviewed: CONTENT_DATE,
    ...(about ? { about } : {}),
  };
}

function articleNode(page: SitePage): Node {
  return {
    "@type": "Article",
    headline: page.title,
    name: page.title,
    url: abs(page.path),
    datePublished: CONTENT_DATE,
    dateModified: CONTENT_DATE,
    author: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME },
    publisher: { "@id": ORG_ID },
  };
}

function blogPosting(page: SitePage): Node {
  return {
    "@type": "BlogPosting",
    headline: page.title,
    url: abs(page.path),
    datePublished: CONTENT_DATE,
    dateModified: CONTENT_DATE,
    author: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME },
    publisher: { "@id": ORG_ID },
  };
}

function isHealthTopic(page: SitePage) {
  return page.path.includes("/dosage-and-usage/");
}

export function schemaFor(page: SitePage) {
  const graph: Node[] = [website(), medicalOrg()];
  const pageUrl = abs(page.path);

  if (page.path !== "/") graph.push(crumbList(page));

  if (page.path === "/") {
    graph.push(
      renewalService("Medical marijuana card renewal (telehealth video)", renewalOffer(PRICES.renewal, `Renewal evaluation ${usd(PRICES.renewal)}. State fee is separate.`)),
      faqEntity(HOME_FAQS),
    );
  }

  if (page.pageType === "Money page") {
    graph.push(medicalPage(page, "Arkansas medical marijuana card"));
    if (page.path === "/pricing/") {
      const offers = [
        renewalOffer(PRICES.renewal, `Renewal evaluation ${usd(PRICES.renewal)}. State fee is separate.`),
      ];
      if (IN_PERSON_OFFERED) {
        offers.push(renewalOffer(PRICES.newInPerson, `New-patient evaluation ${usd(PRICES.newInPerson)}. In-person only.`));
      } else {
        offers.push(
          renewalOffer(
            PRICES.newInPerson,
            `New-patient evaluation ${usd(PRICES.newInPerson)} is listed on the pricing table and is not offered on this build, because in-person visits are not available.`,
          ),
        );
      }
      graph.push(renewalService("Arkansas medical card evaluations", offers));
    }
  }

  if (page.pageType === "FAQ page") graph.push(faqEntity(HOME_FAQS));

  if (page.pageType === "New-patient page") {
    graph.push(medicalPage(page, "Arkansas medical marijuana card"));
    if (IN_PERSON_OFFERED) {
      graph.push(
        renewalService(
          "In-person first certification",
          renewalOffer(PRICES.newInPerson, `New-patient evaluation ${usd(PRICES.newInPerson)}.`),
        ),
      );
    }
  }

  if (page.pageType === "Compare hub") {
    const items = pagesAsItems(childrenOf(page.path));
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("Comparison pages", items), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "Compare page") graph.push(articleNode(page));

  if (page.pageType === "Doctors hub") {
    const items = pagesAsItems(childrenOf(page.path));
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("Physicians", items), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "Doctor profile") {
    const physicianId = `${pageUrl}#physician`;
    graph.push(
      { "@type": "ProfilePage", name: page.title, url: pageUrl, mainEntity: { "@id": physicianId } },
      {
        "@type": "Physician",
        "@id": physicianId,
        name: "Dr. Johnathan Miller",
        url: pageUrl,
        memberOf: { "@id": ORG_ID },
        description:
          "Named in this plan as an Arkansas physician. The Arkansas licence number is not published until it is confirmed.",
      },
    );
  }

  if (page.pageType === "Reviews page") {
    graph.push({ "@type": "WebPage", name: page.title, url: pageUrl });
  }

  if (page.pageType === "Contributors hub") {
    const people = childrenOf(page.path);
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl },
      itemList(
        "Contributors",
        people.map((person) => ({ name: person.title, url: abs(person.path) })),
      ),
    );
  }

  if (page.pageType === "Contributor profile") {
    const personId = `${pageUrl}#person`;
    graph.push(
      { "@type": "ProfilePage", name: page.title, url: pageUrl, mainEntity: { "@id": personId } },
      {
        "@type": "Person",
        "@id": personId,
        name: "Contributor name not assigned",
        url: pageUrl,
        description: "This URL is the contributor template. A first and last name will replace this when a writer is added.",
      },
    );
  }

  if (page.pageType === "Help page") graph.push(faqEntity(HELP_ITEMS));

  if (page.pageType === "Blog hub") {
    const posts = pages.filter((item) => item.pageType === "Blog post");
    graph.push(
      {
        "@type": "Blog",
        name: page.title,
        url: pageUrl,
        blogPost: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: abs(post.path) })),
      },
      {
        "@type": "CollectionPage",
        name: page.title,
        url: pageUrl,
        mainEntity: itemList("Blog sections", pagesAsItems(childrenOf("/blog/"))),
      },
    );
  }

  if (page.pageType === "Silo hub") {
    const posts = childrenOf(page.path).filter((item) => item.pageType === "Blog post");
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("Posts in this section", pagesAsItems(posts)), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "Blog post") {
    graph.push(blogPosting(page));
    if (isHealthTopic(page)) graph.push(medicalPage(page, page.section));
  }

  if (page.pageType === "Conditions hub") {
    const articles = pages.filter((item) => item.pageType === "Condition article");
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("Condition articles", pagesAsItems(articles)), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "Condition article") {
    const about = { "@type": "MedicalCondition", name: page.section };
    graph.push(medicalPage(page, about), { ...articleNode(page), about });
  }

  if (page.pageType === "Tools hub") {
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("Tools", pagesAsItems(childrenOf("/tools/"))), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "Tool") {
    graph.push({
      "@type": "WebApplication",
      name: page.title,
      url: pageUrl,
      applicationCategory: page.path.includes("locator") ? "UtilitiesApplication" : "HealthApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
    if (page.path === "/tools/dispensary-locator/") {
      graph.push(
        itemList(
          "Dispensary directory snapshot",
          DISPENSARIES.map((place) => ({ name: `${place.name}, ${place.address}` })),
        ),
      );
    }
  }

  if (page.pageType === "Cities hub") {
    graph.push(
      { "@type": "CollectionPage", name: page.title, url: pageUrl, mainEntity: { "@id": `${pageUrl}#list` } },
      { ...itemList("City pages", pagesAsItems(childrenOf("/cities/"))), "@id": `${pageUrl}#list` },
    );
  }

  if (page.pageType === "City page") {
    const city = cityFor(page.path);
    graph.push({ "@type": "WebPage", name: page.title, url: pageUrl });
    if (city) {
      graph.push(
        renewalService(
          `Medical card renewal for ${city.name}`,
          renewalOffer(PRICES.renewal, `Renewal evaluation ${usd(PRICES.renewal)}. State fee is separate.`),
          { "@type": "City", name: city.name, containedInPlace: "Arkansas" },
        ),
        faqEntity(cityFaqs(city).map((item) => ({ question: item.q, answer: item.a }))),
      );
    }
  }

  if (page.pageType === "About page") {
    graph.push({ "@type": "AboutPage", name: page.title, url: pageUrl, about: { "@id": ORG_ID } });
  }

  if (page.pageType === "Contact page") {
    graph.push(
      { "@type": "ContactPage", name: page.title, url: pageUrl },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: "Arkansas",
        url: pageUrl,
        description: "Phone, public email, and clinic hours are not published yet.",
      },
    );
  }

  if (page.pageType === "Policy page" || page.pageType === "HTML sitemap") {
    graph.push({ "@type": "WebPage", name: page.title, url: pageUrl });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
