/**
 * Strips the origin (scheme + host) from a URL, keeping only the path and beyond.
 *
 * @example normalizeUrl('https://example.com/api/foo') // '/api/foo'
 * @example normalizeUrl('/api/foo')                     // '/api/foo'
 */
export function normalizeUrl(url: string): string {
  return url.replace(/^https?:\/\/[^/]+/i, '');
}

/**
 * Builds the canonical request key used by the write-access
 * interceptor, cache-invalidation map, and pending-action replay.
 *
 * @example buildRequestKey('POST', 'https://example.com/api/foo') // 'POST /api/foo'
 */
export function buildRequestKey(method: string, url: string): string {
  return `${method.toUpperCase()} ${normalizeUrl(url)}`;
}
