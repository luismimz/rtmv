import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/carta", priority: 0.8, changeFrequency: "weekly" },
  { path: "/reservas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.6, changeFrequency: "monthly" },
  { path: "/aviso-legal", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacidad", priority: 0.2, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
