export const SITE_NAME = "Arkansas Renewal";
export const SITE_TAGLINE = "Medical marijuana card renewal";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-arkansas-domain.com"
).replace(/\/$/, "");

/** Default from the Decisions sheet: in-person first visits are not offered yet. */
export const IN_PERSON_OFFERED = false;

export const PRICES = {
  renewal: 129,
  newInPerson: 149,
  adhPatient: 50,
  adhCaregiver: 50,
  adhVisiting: 50,
  caregiverBackground: 40,
} as const;

export const ADH_HOME =
  "https://healthy.arkansas.gov/programs-services/data-statistics-registries/medical-marijuana/";
export const ADH_FAQS =
  "https://healthy.arkansas.gov/programs-services/data-statistics-registries/medical-marijuana/faqs/";
export const ADH_RESOURCES =
  "https://healthy.arkansas.gov/programs-services/data-statistics-registries/medical-marijuana/resources/";
export const TELEMED_RULE =
  "https://codeofarrules.arkansas.gov/Rules/Rule?chapterID=173&levelType=section&partID=1045&sectionID=36366&subChapterID=216&subPartID=5611&titleID=17";

export const HEADER_LINKS = [
  { href: "/new-patients/", label: "New patients" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/conditions/", label: "Conditions" },
  { href: "/cities/", label: "Cities" },
  { href: "/tools/", label: "Tools" },
  { href: "/blog/", label: "Blog" },
  { href: "/help/", label: "Help" },
] as const;

export const CONDITIONS: { name: string; href: string | null }[] = [
  { name: "Cancer", href: "/conditions/cannabis-for-cancer/" },
  { name: "Glaucoma", href: "/conditions/cannabis-for-glaucoma/" },
  { name: "HIV/AIDS", href: null },
  { name: "Hepatitis C", href: null },
  { name: "ALS", href: null },
  { name: "Tourette syndrome", href: null },
  { name: "Crohn disease", href: "/conditions/cannabis-for-crohns-disease/" },
  { name: "Ulcerative colitis", href: "/conditions/cannabis-for-ulcerative-colitis/" },
  { name: "PTSD", href: "/conditions/cannabis-for-ptsd/" },
  { name: "Severe arthritis", href: "/conditions/cannabis-for-arthritis/" },
  { name: "Fibromyalgia", href: "/conditions/cannabis-for-fibromyalgia/" },
  { name: "Alzheimer disease", href: null },
  { name: "Cachexia or wasting", href: null },
  { name: "Peripheral neuropathy", href: "/conditions/cannabis-for-neuropathy/" },
  { name: "Intractable pain", href: "/conditions/cannabis-for-chronic-pain/" },
  { name: "Severe nausea", href: "/conditions/cannabis-for-nausea/" },
  { name: "Seizures, including epilepsy", href: "/conditions/cannabis-for-seizures/" },
  { name: "Severe muscle spasms, including MS", href: "/conditions/cannabis-for-muscle-spasms/" },
];

export function usd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function summary(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const breakAt = cut.lastIndexOf(" ");
  return `${(breakAt > 80 ? cut.slice(0, breakAt) : cut).trim()}…`;
}
