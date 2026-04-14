"use client";

import Lenis, { type LenisOptions } from "lenis";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

type WrapperTag = "article" | "div" | "section";

type LenisScrollProps = {
  as?: WrapperTag;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  options?: LenisOptions;
  wrapperRef?: RefObject<HTMLElement | null>;
};

const defaultOptions: LenisOptions = {
  duration: 1.1,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 0.9,
  touchMultiplier: 1
};

export function LenisScroll({
  as = "div",
  children,
  className,
  contentClassName,
  options,
  wrapperRef
}: LenisScrollProps) {
  const reduceMotion = useReducedMotion();
  const internalWrapperRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  function setWrapperRef(node: HTMLElement | null) {
    internalWrapperRef.current = node;
    if (wrapperRef) {
      wrapperRef.current = node;
    }
  }

  useEffect(() => {
    if (reduceMotion) return;

    const wrapper = internalWrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    const lenis = new Lenis({
      ...defaultOptions,
      ...options,
      wrapper,
      content
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [options, reduceMotion]);

  if (as === "section") {
    return (
      <section ref={setWrapperRef} className={className}>
        <div ref={contentRef} className={contentClassName}>
          {children}
        </div>
      </section>
    );
  }

  if (as === "article") {
    return (
      <article ref={setWrapperRef} className={className}>
        <div ref={contentRef} className={contentClassName}>
          {children}
        </div>
      </article>
    );
  }

  return (
    <div ref={setWrapperRef} className={className}>
      <div ref={contentRef} className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
