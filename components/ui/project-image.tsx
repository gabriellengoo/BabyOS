"use client";

import { useEffect, useState } from "react";

type ProjectImageProps = {
  alt: string;
  className?: string;
  fallbackSrc: string;
  onLoad?: () => void;
  onError?: () => void;
  primarySrc: string;
};

export function ProjectImage({
  alt,
  className,
  fallbackSrc,
  onLoad,
  onError,
  primarySrc
}: ProjectImageProps) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    setSrc(fallbackSrc);
  }, [fallbackSrc, primarySrc]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={() => {
        if (src !== primarySrc) {
          setSrc(primarySrc);
          return;
        }
        onError?.();
      }}
    />
  );
}
