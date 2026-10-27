import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(profile.siteUrl ? { allow: "/" } : { disallow: "/" }),
    },
    ...(profile.siteUrl ? { sitemap: `${profile.siteUrl}/sitemap.xml` } : {}),
  };
}
