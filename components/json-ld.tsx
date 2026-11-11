type Json = Record<string, unknown>;

/**
 * Renders schema.org JSON-LD. `<` is escaped so a string value can never
 * break out of the script tag.
 */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
