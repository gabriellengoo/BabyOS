"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import { AiOverlay } from "@/components/sections/ai-overlay";
import { FloatingDock } from "@/components/sections/floating-dock";
import { HomeIntroTransition } from "@/components/sections/home-intro-transition";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { LenisScroll } from "@/components/ui/lenis-scroll";

function isWorkDetailRoute(pathname: string) {
  return /^\/work\/[^/]+$/.test(pathname);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname() ?? "";
  const previousPathRef = useRef<string | null>(null);
  const homePage = pathname === "/";
  const skipLoader =
    previousPathRef.current != null &&
    isWorkDetailRoute(previousPathRef.current) &&
    isWorkDetailRoute(pathname);

  const openAi = useCallback(() => setAiOpen(true), []);
  const closeAi = useCallback(() => setAiOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle("ai-open", aiOpen);
    return () => document.body.classList.remove("ai-open");
  }, [aiOpen]);

  useEffect(() => {
    function handleOpenAi() {
      setAiOpen(true);
    }

    window.addEventListener("open-ai-overlay", handleOpenAi);
    return () => window.removeEventListener("open-ai-overlay", handleOpenAi);
  }, []);

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  return (
    <div className={homePage ? "relative h-[100svh] w-screen overflow-hidden" : "relative min-h-screen"}>
      {!reduceMotion && !skipLoader ? <HomeIntroTransition transitionKey={pathname} /> : null}
      <div
        className={`relative flex flex-col transition duration-700 ${
          homePage ? "h-[100svh] w-screen overflow-hidden" : "min-h-screen"
        } ${aiOpen ? "page-obscured" : ""}`}
      >
        {homePage ? null : <SiteHeader />}
        <main className={`relative z-10 flex-1 ${homePage ? "min-h-0 overflow-y-auto" : ""}`}>
          {homePage ? (
            children
          ) : (
            <LenisScroll className="scrollbar-transparent h-[100svh] overflow-y-auto" contentClassName="flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </LenisScroll>
          )}
        </main>
        {homePage ? null : <FloatingDock />}
      </div>
      <AiOverlay open={aiOpen} onClose={closeAi} />
    </div>
  );
}
