export type SitePage = {
  id: number;
  tab: string;
  section: string;
  pageType: string;
  contentType: string;
  secondaryType: string;
  funnel: string;
  title: string;
  path: string;
  keyword: string;
  keywordCheck: string;
  parent: string;
  covers: string;
  linksTo: string;
  schema: string;
  status: string;
  phase: string;
};

export type PlannedLink = {
  href: string;
  label: string;
  slot: "intro" | "end" | "related" | "list";
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export type City = {
  name: string;
  slug: string;
  county: string;
  region: string;
  population: number;
  tier: 1 | 2;
  path: string;
  phase: string;
};

export type Dispensary = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  zone: number;
};
