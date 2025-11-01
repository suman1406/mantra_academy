// Utilities to generate Cloudinary responsive URLs / srcset from a returned secure_url
export function insertCloudinaryTransformation(secureUrl: string, transformation: string) {
  const marker = '/upload/';
  const idx = secureUrl.indexOf(marker);
  if (idx === -1) return secureUrl; // not a cloudinary url we can transform
  const before = secureUrl.slice(0, idx + marker.length);
  const after = secureUrl.slice(idx + marker.length);
  return `${before}${transformation}/${after}`;
}

export function srcForWidth(secureUrl: string, width: number) {
  // Use c_limit to avoid upscaling beyond original
  return insertCloudinaryTransformation(secureUrl, `w_${width},c_limit`);
}

export function srcSetFromSecureUrl(secureUrl: string, widths: number[] = [320,480,768,1024,1280,1600]) {
  if (!secureUrl) return undefined;
  const entries = widths.map(w => `${srcForWidth(secureUrl, w)} ${w}w`);
  return entries.join(', ');
}

export function bestSrc(secureUrl: string, targetWidth = 1024) {
  if (!secureUrl) return secureUrl;
  return srcForWidth(secureUrl, targetWidth);
}
