import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { fabricPhoto } from "@/lib/utils";

/** Fallback social image for pages without their own photography. */
export const defaultOgImage = fabricPhoto(
  "editorial overhead photograph of folded natural cotton and linen fabric in warm neutral tones on a pale surface, soft daylight, luxury textile mood, no text",
  "landscape_16_9",
);

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
};

/**
 * One place that guarantees every page ships the same SEO baseline:
 * canonical, Open Graph, Twitter card, robots directives and keywords.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noIndex,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? defaultOgImage;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: "en_US",
      images: [{ url: ogImage, alt: imageAlt ?? title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
