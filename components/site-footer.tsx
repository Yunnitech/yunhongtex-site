import Link from "next/link";
import { Logo } from "@/components/logo";
import { categories } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

const companyLinks = [
  { href: "/about", label: "About Yunhong" },
  { href: "/services", label: "Services & OEM" },
  { href: "/quality", label: "Quality & compliance" },
  { href: "/insights", label: "Fabric insights" },
  { href: "/faq", label: "Buyer FAQ" },
  { href: "/contact", label: "Contact & RFQ" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="weave-texture">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <Logo tone="light" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
                Woven and knit fabric mill in Shaoxing, China. Supplying apparel brands in Europe,
                North America and the Middle East since {site.foundedYear}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["OEKO-TEX® 100", "GRS 4.0", "GOTS 6.0", "ISO 9001"].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-paper/20 px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-paper/70"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <nav aria-label="Fabric categories">
              <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-paper/45">
                Fabrics
              </h2>
              <ul className="mt-4 space-y-2.5">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/fabrics/${category.slug}`}
                      className="text-sm text-paper/75 transition-colors hover:text-paper"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-paper/45">
                Company
              </h2>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/75 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-paper/45">
                Contact
              </h2>
              <address className="mt-4 space-y-3 text-sm not-italic text-paper/75">
                <p className="leading-relaxed">{site.addressLine}</p>
                <p>
                  <a href={`mailto:${site.email}`} className="hover:text-paper">
                    {site.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-paper">
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={whatsappLink()}
                    className="hover:text-paper"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {site.whatsapp}
                  </a>
                </p>
                <p className="text-paper/50">{site.hours}</p>
              </address>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/privacy" className="hover:text-paper/80">
                Privacy policy
              </Link>
              <Link href="/terms" className="hover:text-paper/80">
                Terms of sale
              </Link>
              <a href="/sitemap.xml" className="hover:text-paper/80">
                Sitemap
              </a>
              <a
                href={site.social.linkedin}
                className="hover:text-paper/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
