"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * WhatsApp anchor that reports a `whatsapp_click` conversion event to GA4,
 * tagged with where on the site the click happened.
 */
export function WhatsAppLink({
  href,
  children,
  className,
  location,
  target = "_blank",
  rel = "noopener noreferrer",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  location: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}
