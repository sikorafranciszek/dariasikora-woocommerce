/**
 * Replace WordPress image URLs with CDN URLs
 * @param url - Original WordPress image URL
 * @returns CDN URL or original URL if not a WordPress image
 */
export function getCdnUrl(url: string | undefined | null): string {
  if (!url) return "";

  const wpDomain = "wp.dariasikora.com";
  const cdnDomain = "cdn.dariasikora.com";

  // Check if URL contains WordPress domain
  if (url.includes(wpDomain)) {
    return url.replace(wpDomain, cdnDomain);
  }

  return url;
}

/**
 * Replace WordPress image URLs in an array of images
 * @param images - Array of image objects with src property
 * @returns Array with CDN URLs
 */
export function getCdnImages<T extends { src?: string }>(
  images: T[] | undefined
): T[] {
  if (!images) return [];

  return images.map((image) => ({
    ...image,
    src: image.src ? getCdnUrl(image.src) : image.src,
  }));
}
