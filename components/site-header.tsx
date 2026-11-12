import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getSite } from "@/lib/queries";
import { nav, whatsappLink } from "@/lib/site";

export async function SiteHeader() {
  const site = await getSite();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="hidden border-b border-line/60 md:block">
        <div className="shell flex h-9 items-center justify-between text-[0.625rem] uppercase tracking-[0.16em] text-muted">
          <p>Mill-direct fabric · Shaoxing, China · since {site.foundedYear}</p>
          <div className="flex items-center gap-6">
            <span>OEKO-TEX® · GRS · GOTS · ISO 9001</span>
            <a href={`mailto:${site.email}`} className="link-underline normal-case tracking-normal">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.875rem] text-ink-soft transition-colors hover:text-clay"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppLink
            href={whatsappLink(site.whatsapp)}
            location="header"
            className="hidden text-[0.8125rem] text-ink-soft transition-colors hover:text-clay xl:inline"
          >
            WhatsApp {site.whatsapp}
          </WhatsAppLink>
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
            Request a quote
          </Link>
          <MobileNav email={site.email} />
        </div>
      </div>
    </header>
  );
}
