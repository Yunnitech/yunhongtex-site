import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { defaultOgImage } from "@/lib/seo";
import { getSite } from "@/lib/queries";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `B2B Fabric Mill & Exporter — Cotton, Linen, Denim, Knit | ${site.name}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "Textiles & Apparel Fabric",
    keywords: [
      "fabric supplier",
      "fabric manufacturer China",
      "wholesale fabric exporter",
      "cotton fabric supplier",
      "linen fabric wholesale",
      "denim fabric manufacturer",
      "knit fabric supplier",
      "viscose fabric exporter",
      "GRS recycled fabric",
      "OEKO-TEX certified fabric",
      "B2B fabric sourcing",
    ],
    alternates: {
      canonical: "/",
    },
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `B2B Fabric Mill & Exporter — ${site.name}`,
      description: site.description,
      url: site.url,
      locale: "en_US",
      images: [{ url: defaultOgImage, width: 1200, height: 675, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `B2B Fabric Mill & Exporter — ${site.name}`,
      description: site.description,
      images: [defaultOgImage],
    },
    robots: {
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
  };
}

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://trae-api-cn.mchost.guru" />
        <link rel="alternate" type="text/plain" href={absoluteUrl("/llms.txt")} title="LLM site guide" />
      </head>
      <body>
        <JsonLd data={[organizationSchema(site), websiteSchema(site)]} />
        {children}
      </body>
    </html>
  );
}
