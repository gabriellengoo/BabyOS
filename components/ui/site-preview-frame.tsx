"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectImage } from "@/components/ui/project-image";

type SitePreviewFrameProps = {
  title: string;
  siteUrl: string;
  previewVideoUrl?: string;
  previewVideoUrls?: string[];
  previewVideoFit?: "cover" | "contain";
  fallbackSrc: string;
  primarySrc: string;
  preferImage?: boolean;
  preferImageOnMobile?: boolean;
  coverImageOnMobile?: boolean;
  className?: string;
};

function toVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  const id = match?.[1] ?? "";

  if (!id) {
    return url;
  }

  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&title=0&byline=0&portrait=0`;
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  frameWidth: number,
  frameHeight: number,
  sourceWidth: number,
  sourceHeight: number
) {
  const frameRatio = frameWidth / frameHeight;
  const sourceRatio = sourceWidth / sourceHeight;

  let drawWidth = frameWidth;
  let drawHeight = frameHeight;
  let drawX = 0;
  let drawY = 0;

  if (sourceRatio > frameRatio) {
    drawHeight = frameHeight;
    drawWidth = drawHeight * sourceRatio;
    drawX = (frameWidth - drawWidth) / 2;
  } else {
    drawWidth = frameWidth;
    drawHeight = drawWidth / sourceRatio;
    drawY = (frameHeight - drawHeight) / 2;
  }

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function PixelatedLoadingPreview({
  src,
  alt,
  sampleSize = 14
}: {
  src: string;
  alt: string;
  sampleSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    let rafId = 0;

    const draw = () => {
      const width = frame.clientWidth;
      const height = frame.clientHeight;
      if (!width || !height) return;

      canvas.width = width;
      canvas.height = height;

      const reducedWidth = Math.max(1, Math.ceil(width / sampleSize));
      const reducedHeight = Math.max(1, Math.ceil(height / sampleSize));
      const pixelCanvas = document.createElement("canvas");
      pixelCanvas.width = reducedWidth;
      pixelCanvas.height = reducedHeight;

      const pixelContext = pixelCanvas.getContext("2d");
      if (!pixelContext) return;

      pixelContext.imageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      pixelContext.clearRect(0, 0, reducedWidth, reducedHeight);
      drawImageCover(
        pixelContext,
        image,
        reducedWidth,
        reducedHeight,
        image.naturalWidth || reducedWidth,
        image.naturalHeight || reducedHeight
      );

      context.clearRect(0, 0, width, height);
      drawImageCover(
        context,
        pixelCanvas,
        width,
        height,
        reducedWidth,
        reducedHeight
      );
      context.fillStyle = "rgba(0, 0, 0, 0.08)";
      context.fillRect(0, 0, width, height);
    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(draw);
    };

    image.onload = scheduleDraw;
    image.onerror = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    image.alt = alt;
    image.decoding = "async";
    image.src = src;
    if (image.complete) {
      scheduleDraw();
    }

    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(frame);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [alt, sampleSize, src]);

  return (
    <div ref={frameRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

export function SitePreviewFrame({
  title,
  siteUrl,
  previewVideoUrl,
  previewVideoUrls,
  previewVideoFit = "cover",
  fallbackSrc,
  primarySrc,
  preferImage = false,
  preferImageOnMobile = true,
  coverImageOnMobile = false,
  className
}: SitePreviewFrameProps) {
  const [mode, setMode] = useState<"loading" | "iframe" | "image">("loading");
  const [fallbackVisible, setFallbackVisible] = useState(preferImage);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activePreviewVideoIndex, setActivePreviewVideoIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const previewVideoList = previewVideoUrls?.length
    ? previewVideoUrls
    : previewVideoUrl
      ? [previewVideoUrl]
      : [];
  const activePreviewVideoUrl = previewVideoList[activePreviewVideoIndex] ?? previewVideoList[0];
  const previewUrl = activePreviewVideoUrl ? toVimeoEmbedUrl(activePreviewVideoUrl) : siteUrl;
  const hasPreviewVideo = previewVideoList.length > 0;
  const shouldPreferImage = preferImage || (!hasPreviewVideo && preferImageOnMobile && isMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setActivePreviewVideoIndex(0);
  }, [previewVideoUrls, previewVideoUrl]);

  useEffect(() => {
    if (previewVideoList.length < 2 || shouldPreferImage) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActivePreviewVideoIndex((currentIndex) => (currentIndex + 1) % previewVideoList.length);
    }, 6000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [previewVideoList, shouldPreferImage]);

  useEffect(() => {
    setFallbackLoaded(false);

    if (shouldPreferImage) {
      setFallbackVisible(true);
      setMode("loading");
      return;
    }

    setFallbackVisible(false);
    setMode("loading");
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setFallbackVisible(true);
    }, 8000);

    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldPreferImage, previewUrl]);

  useEffect(() => {
    if (fallbackVisible && fallbackLoaded) {
      setMode("image");
    }
  }, [fallbackLoaded, fallbackVisible]);

  return (
    <div className={className}>
      {!shouldPreferImage && mode !== "image" ? (
        <div className="absolute inset-0 overflow-hidden bg-transparent">
          <iframe
            src={previewUrl}
            title={hasPreviewVideo ? `${title} video preview` : `${title} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow={hasPreviewVideo ? "autoplay; fullscreen; picture-in-picture" : undefined}
            className={`pointer-events-none absolute left-1/2 top-1/2 border-0 ${
              hasPreviewVideo
                ? previewVideoFit === "contain"
                  ? "h-full w-full -translate-x-1/2 -translate-y-1/2"
                  : "h-[140%] w-[140%] -translate-x-1/2 -translate-y-[56%]"
                : "inset-0 h-full w-full -translate-x-1/2 -translate-y-1/2"
            }`}
            onLoad={() => {
              if (timeoutRef.current != null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
              setMode("iframe");
            }}
          />
        </div>
      ) : null}

      {(shouldPreferImage || fallbackVisible || mode === "loading") && mode !== "iframe" ? (
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <ProjectImage
            alt={`${title} loading preview`}
            fallbackSrc={fallbackSrc}
            primarySrc={primarySrc}
            className={`block h-full w-full ${coverImageOnMobile ? "object-cover object-center" : "object-contain object-top md:object-cover md:object-center"}`}
            onLoad={() => setFallbackLoaded(true)}
          />
        </div>
      ) : null}

      {mode === "loading" ? (
        <PixelatedLoadingPreview
          src={fallbackSrc}
          alt={`${title} pixelated loading preview`}
        />
      ) : null}
    </div>
  );
}
