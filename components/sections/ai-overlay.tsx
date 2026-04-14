"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { aiVideos } from "@/lib/ai-videos";

function AiVideoPanel({
  embedUrl,
  index
}: {
  embedUrl: string;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative h-[100svh] w-[31vw] min-w-[31vw] flex-none overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={`AI video ${index + 1}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="pointer-events-none absolute inset-y-0 left-[-0.063vw] h-full w-[calc(100%+0.125vw)] border-0"
        onLoad={() => setLoaded(true)}
      />
      {!loaded ? (
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 backdrop-blur-md" />
      ) : null}
    </section>
  );
}

export function AiOverlay({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const embedUrls = useMemo(() => aiVideos.map((video) => video.embedUrl), []);

  useEffect(() => {
    if (!open) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open || reduceMotion) return;
    const element = scrollerRef.current;
    if (!element) return;

    let frame = 0;
    let lastTime = performance.now();

    const step = (time: number) => {
      const elapsed = time - lastTime;
      lastTime = time;

      if (element.scrollWidth > element.clientWidth) {
        element.scrollLeft += elapsed * 0.035;
        if (element.scrollLeft >= element.scrollWidth - element.clientWidth - 2) {
          element.scrollLeft = 0;
        }
      }

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [open, reduceMotion]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] bg-black"
          aria-label="AI video gallery"
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-3 py-3 md:px-4">
            <p className="type-small font-strong">
              Based in London
              <br />
              operating worldwide.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-strong text-[3vw] leading-none text-white mix-blend-difference"
            >
              Back
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="scrollbar-none flex h-[100svh] gap-0 overflow-x-auto overflow-y-hidden"
          >
            {embedUrls.map((embedUrl, index) => (
              <AiVideoPanel
                key={`${embedUrl}-${index}`}
                embedUrl={embedUrl}
                index={index}
              />
            ))}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
