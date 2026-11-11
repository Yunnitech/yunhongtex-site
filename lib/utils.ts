export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Fabric photography is generated on demand and cached by the image CDN.
 * Keeping the helper in one place means swapping to a real asset pipeline
 * (S3, Cloudinary, Shopify CDN) is a one-file change.
 */
export function fabricPhoto(prompt: string, size: ImageSize = "landscape_4_3") {
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;
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
