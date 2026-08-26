import type { Metadata } from "next";
import { siteContent } from "@/app/data/site-content";

export function buildPageMetadata(
  page: { title: string; description: string },
  path: string,
): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      images: [siteContent.seo.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteContent.seo.ogImage],
    },
  };
}
