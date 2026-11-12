/**
 * Client-side GA4 event helper. No-ops when gtag has not loaded (e.g. the
 * GA_ID is unset or the snippet is still downloading), so it is safe to call
 * from any client component.
 */
export function trackEvent(event: string, params?: Record<string, unknown>) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}
