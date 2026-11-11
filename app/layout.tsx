import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { defaultOgImage } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "B2B Fabric Mill & Exporter — Cotton, Linen, Denim, Knit | Yunhong Textiles",
    template: "%s | Yunhong Textiles",
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
    title: "B2B Fabric Mill & Exporter — Yunhong Textiles",
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [{ url: defaultOgImage, width: 1200, height: 675, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Fabric Mill & Exporter — Yunhong Textiles",
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

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://trae-api-cn.mchost.guru" />
        <link rel="alternate" type="text/plain" href={absoluteUrl("/llms.txt")} title="LLM site guide" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
