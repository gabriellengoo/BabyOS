"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type SmoothScrollPanelProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  smoothness?: number;
};

export function SmoothScrollPanel({
  children,
  className,
  contentClassName,
  smoothness = 0.1
}: SmoothScrollPanelProps) {
  const reduceMotion = useReducedMotion();
  const [disabled, setDisabled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setDisabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (disabled) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const spacer = spacerRef.current;
    if (!wrapper || !content || !spacer) return;

    const clampScroll = () => {
      const contentHeight = Math.ceil(
        Math.max(content.scrollHeight, content.offsetHeight, content.getBoundingClientRect().height)
      );
      const maxScroll = Math.max(0, contentHeight - wrapper.clientHeight);
      if (wrapper.scrollTop > maxScroll) {
        wrapper.scrollTop = maxScroll;
      }
      return maxScroll;
    };

    const syncHeight = () => {
      const nextHeight = Math.ceil(
        Math.max(content.scrollHeight, content.offsetHeight, content.getBoundingClientRect().height)
      );
      spacer.style.height = `${nextHeight}px`;
      return clampScroll();
    };

    let maxScroll = syncHeight();
    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(content);

    let frame = 0;
    let current = Math.min(wrapper.scrollTop, maxScroll);
    let target = Math.min(wrapper.scrollTop, maxScroll);

    const update = () => {
      maxScroll = clampScroll();
      target = Math.min(wrapper.scrollTop, maxScroll);
      current += (target - current) * smoothness;
      current = Math.min(current, maxScroll);
      current = Math.max(current, 0);

      if (Math.abs(target - current) < 0.1) {
        current = target;
      }

      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      content.style.transform = "";
      spacer.style.height = "";
    };
  }, [disabled, reduceMotion, smoothness]);

  if (disabled || reduceMotion) {
    return (
      <div className={className}>
        <div className={contentClassName?.replace(/\babsolute\b|\binset-x-0\b|\btop-0\b|\bwill-change-transform\b/g, "").trim()}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={spacerRef} aria-hidden="true" />
      <div ref={contentRef} className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
