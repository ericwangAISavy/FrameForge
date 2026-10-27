import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { studies } from "@/content/case-studies";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return [];
  return [
    "",
    "/work",
    "/engineering",
    "/playground",
    "/about",
    "/contact",
    "/work/echoes-of-the-divide",
    ...studies.map((s) => `/engineering/${s.slug}`),
  ].map((path) => ({ url: `${profile.siteUrl}${path}` }));
}
