"use client";

import React from "react";
import { srcSetFromSecureUrl, bestSrc } from "@/lib/cloudinaryUtils";

export function ResponsiveImage({ image, alt, className, sizes }: { image: any; alt?: string; className?: string; sizes?: string }) {
  // image can be a string or an object with various possible keys depending on how it was stored
  if (!image) return null;

  let secureUrl: string | undefined;

  if (typeof image === 'string') {
    secureUrl = image;
  } else if (typeof image === 'object') {
    // try common Cloudinary response shapes and other variants
    secureUrl = image.secure_url || image.secureUrl || image.url || image.path || image.src || image.imageUrl;
    // nested variants (e.g., { image: { secure_url: ... } })
    if (!secureUrl) {
      for (const key of ['image', 'data', 'file']) {
        const nested = (image as any)[key];
        if (nested && typeof nested === 'object') {
          secureUrl = nested.secure_url || nested.secureUrl || nested.url || nested.path || nested.src;
          if (secureUrl) break;
        }
      }
    }
  }

  if (!secureUrl) return null;

  const srcset = srcSetFromSecureUrl(secureUrl);
  const src = bestSrc(secureUrl, 1024);

  return (
    <img
      src={src}
      srcSet={srcset}
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      alt={alt || ''}
      className={className}
      loading="lazy"
    />
  );
}

export default ResponsiveImage;
