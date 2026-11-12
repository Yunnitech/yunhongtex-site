export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Fabric photography is served from public/images/. Each asset is a stable,
 * self-hosted file keyed by an FNV-1a hash of its original generation URL.
 * Keeping the helper in one place means swapping to a real asset pipeline
 * (S3, Cloudinary, Shopify CDN, or real product photography) is a one-file
 * change: replace the files in public/images/ or rewrite this function.
 */
export function fabricPhoto(prompt: string, size: ImageSize = "landscape_4_3") {
  const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;
  return `/images/${fnv1a(url)}.jpg`;
}

/** FNV-1a 32-bit — deterministic, dependency-free asset key. */
function fnv1a(str: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

export function formatPrice(value: number) {
  return `US$${value.toFixed(2)}`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
