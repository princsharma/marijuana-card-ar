import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`,
  }));
}
