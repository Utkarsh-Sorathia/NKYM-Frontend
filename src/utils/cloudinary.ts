/**
 * Inserts Cloudinary delivery transformations (auto format, auto quality,
 * capped width) into an existing Cloudinary upload URL. Photos are uploaded
 * full-resolution via the admin panel (some 3MB+), but the site never
 * displays them anywhere near that size — this asks Cloudinary to serve an
 * appropriately-sized, compressed variant instead, cached under its own URL.
 * Falls back to the original URL untouched if it doesn't look like a
 * Cloudinary upload URL.
 */
export function optimizeCloudinaryUrl(url: string, width: number): string {
  const marker = '/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  const insertAt = idx + marker.length;
  return `${url.slice(0, insertAt)}f_auto,q_auto,w_${width}/${url.slice(insertAt)}`;
}
