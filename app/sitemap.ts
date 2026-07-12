import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";

const siteUrl = "https://www.merci-immobilier.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/annonces`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/vendre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/estimation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/honoraires`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/mentions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const supabase = await createClient();
    const { data: properties } = await supabase
      .from("properties")
      .select("id, updated_at");

    const propertyRoutes: MetadataRoute.Sitemap = (properties || []).map((property) => ({
      url: `${siteUrl}/annonces/${property.id}`,
      lastModified: property.updated_at ? new Date(property.updated_at) : undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
