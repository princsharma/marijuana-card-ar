import type { City } from "@/lib/types";

export const CITIES: City[] = [
  { name: "Little Rock", slug: "little-rock", county: "Pulaski", region: "Central", population: 206427, tier: 1, path: "/cities/medical-card-little-rock/", phase: "Launch" },
  { name: "Fayetteville", slug: "fayetteville", county: "Washington", region: "Northwest", population: 106623, tier: 1, path: "/cities/medical-card-fayetteville/", phase: "Launch" },
  { name: "Fort Smith", slug: "fort-smith", county: "Sebastian", region: "River Valley", population: 90855, tier: 1, path: "/cities/medical-card-fort-smith/", phase: "Launch" },
  { name: "Springdale", slug: "springdale", county: "Washington / Benton", region: "Northwest", population: 90685, tier: 1, path: "/cities/medical-card-springdale/", phase: "Launch" },
  { name: "Jonesboro", slug: "jonesboro", county: "Craighead", region: "Northeast", population: 83296, tier: 1, path: "/cities/medical-card-jonesboro/", phase: "Launch" },
  { name: "Rogers", slug: "rogers", county: "Benton", region: "Northwest", population: 76956, tier: 1, path: "/cities/medical-card-rogers/", phase: "Launch" },
  { name: "Conway", slug: "conway", county: "Faulkner", region: "Central", population: 72328, tier: 1, path: "/cities/medical-card-conway/", phase: "Launch" },
  { name: "North Little Rock", slug: "north-little-rock", county: "Pulaski", region: "Central", population: 65120, tier: 1, path: "/cities/medical-card-north-little-rock/", phase: "Launch" },
  { name: "Bentonville", slug: "bentonville", county: "Benton", region: "Northwest", population: 63057, tier: 1, path: "/cities/medical-card-bentonville/", phase: "Launch" },
  { name: "Benton", slug: "benton", county: "Saline", region: "Central", population: 38898, tier: 1, path: "/cities/medical-card-benton/", phase: "Launch" },
  { name: "Pine Bluff", slug: "pine-bluff", county: "Jefferson", region: "Southeast", population: 38213, tier: 2, path: "/cities/medical-card-pine-bluff/", phase: "Tier 2 batch 1" },
  { name: "Hot Springs", slug: "hot-springs", county: "Garland", region: "Central", population: 37979, tier: 2, path: "/cities/medical-card-hot-springs/", phase: "Tier 2 batch 1" },
  { name: "Bella Vista", slug: "bella-vista", county: "Benton", region: "Northwest", population: 34518, tier: 2, path: "/cities/medical-card-bella-vista/", phase: "Tier 2 batch 1" },
  { name: "Sherwood", slug: "sherwood", county: "Pulaski", region: "Central", population: 33620, tier: 2, path: "/cities/medical-card-sherwood/", phase: "Tier 2 batch 1" },
  { name: "Paragould", slug: "paragould", county: "Greene", region: "Northeast", population: 31135, tier: 2, path: "/cities/medical-card-paragould/", phase: "Tier 2 batch 1" },
  { name: "Russellville", slug: "russellville", county: "Pope", region: "River Valley", population: 29521, tier: 2, path: "/cities/medical-card-russellville/", phase: "Tier 2 batch 2" },
  { name: "Jacksonville", slug: "jacksonville", county: "Pulaski", region: "Central", population: 29460, tier: 2, path: "/cities/medical-card-jacksonville/", phase: "Tier 2 batch 2" },
  { name: "Texarkana", slug: "texarkana", county: "Miller", region: "Southwest", population: 29123, tier: 2, path: "/cities/medical-card-texarkana/", phase: "Tier 2 batch 2" },
  { name: "Cabot", slug: "cabot", county: "Lonoke", region: "Central", population: 27711, tier: 2, path: "/cities/medical-card-cabot/", phase: "Tier 2 batch 2" },
  { name: "Centerton", slug: "centerton", county: "Benton", region: "Northwest", population: 27176, tier: 2, path: "/cities/medical-card-centerton/", phase: "Tier 2 batch 2" },
  { name: "Van Buren", slug: "van-buren", county: "Crawford", region: "River Valley", population: 24556, tier: 2, path: "/cities/medical-card-van-buren/", phase: "Tier 2 batch 3" },
  { name: "Searcy", slug: "searcy", county: "White", region: "Central", population: 24351, tier: 2, path: "/cities/medical-card-searcy/", phase: "Tier 2 batch 3" },
  { name: "West Memphis", slug: "west-memphis", county: "Crittenden", region: "Northeast", population: 23336, tier: 2, path: "/cities/medical-card-west-memphis/", phase: "Tier 2 batch 3" },
  { name: "Bryant", slug: "bryant", county: "Saline", region: "Central", population: 22815, tier: 2, path: "/cities/medical-card-bryant/", phase: "Tier 2 batch 3" },
  { name: "Siloam Springs", slug: "siloam-springs", county: "Benton", region: "Northwest", population: 21298, tier: 2, path: "/cities/medical-card-siloam-springs/", phase: "Tier 2 batch 3" },
  { name: "Maumelle", slug: "maumelle", county: "Pulaski", region: "Central", population: 19780, tier: 2, path: "/cities/medical-card-maumelle/", phase: "Tier 2 batch 4" },
  { name: "El Dorado", slug: "el-dorado", county: "Union", region: "South", population: 16609, tier: 2, path: "/cities/medical-card-el-dorado/", phase: "Tier 2 batch 4" },
  { name: "Forrest City", slug: "forrest-city", county: "St. Francis", region: "Northeast", population: 12308, tier: 2, path: "/cities/medical-card-forrest-city/", phase: "Tier 2 batch 4" },
  { name: "Blytheville", slug: "blytheville", county: "Mississippi", region: "Northeast", population: 12227, tier: 2, path: "/cities/medical-card-blytheville/", phase: "Tier 2 batch 4" },
];

const byPath = new Map(CITIES.map((city) => [city.path, city]));

export function cityFor(path: string) {
  return byPath.get(path);
}

export function nearbyCities(city: City, count = 3) {
  const others = CITIES.filter((item) => item.path !== city.path);
  const sameRegion = others.filter((item) => item.region === city.region);
  const picked = [...sameRegion];
  for (const item of others) {
    if (picked.length >= count) break;
    if (!picked.some((existing) => existing.path === item.path)) picked.push(item);
  }
  return picked.slice(0, count);
}

export function formatPopulation(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function cityFaqs(city: City) {
  return [
    {
      id: `${city.slug}-first`,
      q: `Can I get my first medical card online if I live in ${city.name}?`,
      a: `No. Arkansas does not allow a first certification by telemedicine, including for ${city.name} residents. The first visit has to be in person. Renewals can be done by video.`,
    },
    {
      id: `${city.slug}-renew`,
      q: `Can ${city.name} patients renew by video?`,
      a: "Yes, if you already have an Arkansas card. The renewal visit has to be video. Audio-only renewals are not allowed.",
    },
    {
      id: `${city.slug}-county`,
      q: `Which county is ${city.name} in?`,
      a: `${city.name} is in ${city.county} County, in the ${city.region} region used on this site.`,
    },
    {
      id: `${city.slug}-buy`,
      q: `Where do ${city.name} patients buy cannabis?`,
      a: "From a licensed Arkansas dispensary, not from this practice. Bring your card and ID. The state tracks a 2.5 ounce limit across all dispensaries in each 14-day period.",
    },
    {
      id: `${city.slug}-cost`,
      q: `How much does renewal cost for a ${city.name} patient?`,
      a: "The evaluation on this site is $129. The Arkansas Department of Health charges a separate $50 fee. There is no reduced state fee in the current rules.",
    },
    {
      id: `${city.slug}-grow`,
      q: `Can I grow plants at home in ${city.name}?`,
      a: "No. Home grow is not allowed for patients or caregivers anywhere in Arkansas.",
    },
  ];
}
