"use client";

import React from "react";
import { srcSetFromSecureUrl, bestSrc } from "@/lib/cloudinaryUtils";

export function ResponsiveImage({ image, alt, className, sizes }: { image: any; alt?: string; className?: string; sizes?: string }) {
  // image can be a string or an object with secure_url/url
  const secureUrl = image && typeof image === 'object' ? (image.secure_url || image.url) : image;
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
