const FALLBACK_IMAGE = '/placeholder.jpg';

export function sanitizeImageUrl(url: string | undefined): string {
  if (!url || url.trim() === '') {
    return FALLBACK_IMAGE;
  }
  if (url.startsWith('/')) {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return `/${url}`;
}

export function getImageProps(url: string | undefined) {
  const sanitized = sanitizeImageUrl(url);
  const isExternal = sanitized.startsWith('http');
  return {
    src: sanitized,
    isExternal,
    fallback: FALLBACK_IMAGE,
  };
}
