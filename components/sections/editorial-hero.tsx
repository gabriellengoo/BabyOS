"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent
} from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { SitePreviewFrame } from "@/components/ui/site-preview-frame";
import { LenisScroll } from "@/components/ui/lenis-scroll";
import { aiVideos } from "@/lib/ai-videos";
import { projects } from "@/lib/projects";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const BABY_OS_TEXT = "BabyOS is typeing..";
const BABY_OS_PROMPT = "vibe with babyOS?";
const BABY_OS_SPOTIFY_URL =
  "https://open.spotify.com/playlist/3MhEFRPMJYjJEoL6fEJupW?si=EUEznE8qTOyZRsHNqP03Xw";
const BABY_OS_SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/3MhEFRPMJYjJEoL6fEJupW?utm_source=generator&theme=0&autoplay=1";

function formatUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getProjectLabel(project: (typeof projects)[number]) {
  const aiSuffix = project.usesArtificialIntelligence ? " / Artificial Intelligence" : "";

  switch (project.category) {
    case "Creative Development":
      return `Creative Technology Project${aiSuffix}`;
    case "Client Work":
      return `Client Website / Professional Project${aiSuffix}`;
    case "Experimental":
      return `Experimental Web Project${aiSuffix}`;
    default:
      return `Digital Project${aiSuffix}`;
  }
}

function ScrambledFooterLabel({ reduceMotion }: { reduceMotion: boolean }) {
  const [displayText, setDisplayText] = useState(BABY_OS_TEXT);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(BABY_OS_TEXT);
      return;
    }

    let scrambleTimer = 0;
    let loopTimer = 0;

    const runScramble = () => {
      const characters = BABY_OS_TEXT.split("");
      const mutableIndexes = characters
        .map((character, index) => (character === " " ? -1 : index))
        .filter((index) => index >= 0);
      const current = [...characters];
      let step = 0;

      const tick = () => {
        step += 1;

        mutableIndexes.forEach((index) => {
          if (step >= 12) {
            current[index] = BABY_OS_TEXT[index];
            return;
          }

          const shouldReveal = Math.random() > 0.48 && step > 4;
          current[index] = shouldReveal
            ? BABY_OS_TEXT[index]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        });

        setDisplayText(current.join(""));

        if (step < 12) {
          scrambleTimer = window.setTimeout(tick, 55);
        } else {
          setDisplayText(BABY_OS_TEXT);
        }
      };

      tick();
      loopTimer = window.setTimeout(runScramble, 10000);
    };

    loopTimer = window.setTimeout(runScramble, 10000);

    return () => {
      window.clearTimeout(scrambleTimer);
      window.clearTimeout(loopTimer);
    };
  }, [reduceMotion]);

  return <>{displayText}</>;
}

export function EditorialHero() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoveredAiLabel, setHoveredAiLabel] = useState<string | null>(null);
  const [showBabyPrompt, setShowBabyPrompt] = useState(false);
  const [showSpotifyDemo, setShowSpotifyDemo] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const emphasisSlug = hoveredSlug ?? activeProject.slug;
  const aiHoverActive = hoveredAiLabel != null;
  const hoveredAiVideo = aiVideos.find((video) => video.id === hoveredAiLabel) ?? null;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  function updateActiveProject() {
    const container = scrollRef.current;
    if (!container) return;

    const viewportCenter = container.scrollTop + container.clientHeight / 2;
    let nextSlug = projects[0]?.slug ?? "";
    let closestDistance = Number.POSITIVE_INFINITY;

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const panelCenter = panel.offsetTop + panel.offsetHeight / 2;
      const distance = Math.abs(panelCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        nextSlug = projects[index]?.slug ?? nextSlug;
      }
    });

    setActiveSlug(nextSlug);
  }

  useEffect(() => {
    updateActiveProject();
    window.addEventListener("resize", updateActiveProject);
    return () => window.removeEventListener("resize", updateActiveProject);
  }, []);

  function handleScroll(_: UIEvent<HTMLDivElement>) {
    updateActiveProject();
  }

  function focusProject(slug: string) {
    const index = projects.findIndex((project) => project.slug === slug);
    const panel = panelRefs.current[index];
    if (!panel || !scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: panel.offsetTop,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  const footerLinks = useMemo(
    () => [
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Contact" }
    ],
    []
  );

  return (
    <section
      className={`relative h-[100svh] overflow-hidden pb-3 pl-0 md:pr-3 pt-0 transition-colors duration-500 md:pb-4 md:pl-0 pr-0 ${
        aiHoverActive ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 z-30 ${
          aiHoverActive ? "text-white" : "text-black"
        }`}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,65vw)_minmax(0,1fr)] md:gap-0">
          <div className="hidden md:block" />
          <div className={`home-babyos-banner-wrap ${aiHoverActive ? "home-babyos-banner-wrap-ai" : ""}`}>
            <p className={`home-babyos-banner font-test-sohne-fett font-black ${aiHoverActive ? "home-babyos-banner-ai" : ""}`}>
              BabyOS
            </p>
          </div>
        </div>
      </div>

      {showSpotifyDemo ? (
        <div className="pointer-events-none absolute right-4 top-[4.8vw] z-30 hidden w-[22vw] overflow-hidden rounded md:block">
          <iframe
            src={BABY_OS_SPOTIFY_EMBED_URL}
            title="BabyOS Spotify playlist preview"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="pointer-events-auto block h-[8vw] w-full border-0"
          />
        </div>
      ) : null}

      <div className="grid h-full grid-cols-1 grid-rows-[52svh_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,65vw)_minmax(0,1fr)] md:grid-rows-1">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className={`relative min-h-0 overflow-hidden transition-colors duration-500 ${
            aiHoverActive ? "bg-black" : "bg-white"
          }`}
        >
          {hoveredAiVideo ? (
            <div className="absolute inset-0 z-20 bg-black">
              <iframe
                src={hoveredAiVideo.embedUrl}
                title={`${hoveredAiVideo.title} preview`}
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute inset-x-0 bottom-0 top-5 h-[calc(100%-5.128vw)] w-full border-0 md:top-8 md:h-[calc(100%-2vw)]"
              />
            </div>
          ) : null}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-none h-full overflow-y-auto md:pr-3"
          >
            {projects.map((project, index) => {
              const focused = emphasisSlug === project.slug;
              const dimmed = hoveredSlug != null && !focused;

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  onMouseEnter={() => {
                    if (!canHover) return;
                    setHoveredSlug(project.slug);
                    setHoveredAiLabel(null);
                    focusProject(project.slug);
                    document.body.style.backgroundColor = "black"; // Safari fix
                  }}
                  onMouseLeave={() => {
                    if (!canHover) return;
                    setHoveredSlug(null);
                    document.body.style.backgroundColor = ""; // Reset background
                  }}
                  className={`group relative block h-[52svh] overflow-hidden bg-[#f3f3f3] transition-[opacity,transform] duration-700 ease-out first:mt-0 md:h-[108svh] ${
                    index === 0 ? "" : "mt-3"
                  } ${dimmed ? "opacity-[0.16]" : "opacity-100"}`}
                >
                  <div className="absolute inset-0 md:scale-[1.01]">
                    <SitePreviewFrame
                      title={project.title}
                      siteUrl={project.siteUrl}
                      fallbackSrc={project.fallbackImage}
                      primarySrc={project.previewImage}
                      preferImage={project.preferImagePreview}
                      coverImageOnMobile
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className={`relative z-10 min-h-0 overflow-hidden py-3 uppercase transition-colors duration-500 md:py-4 ${
            aiHoverActive ? "text-white" : "text-black"
          }`}
        >
          <LenisScroll
            className="scrollbar-none h-[calc(100%-14.359vw)] overflow-y-auto md:h-[calc(100%-3.5vw)]"
            contentClassName="grid min-h-full gap-3 pb-[18vw] pt-[18vw] md:pb-[4vw] md:pt-[7.25vw]"
          >
            <div className="grid content-start justify-items-center gap-x-8 gap-y-7 overflow-visible pt-1 text-center md:grid-cols-2 md:justify-items-start md:text-left xl:grid-cols-3">
              {projects.map((project, index) => {
                const focused = emphasisSlug === project.slug;
                const dimmed =
                  canHover &&
                  ((hoveredSlug != null && !focused) || hoveredAiLabel != null);

                return (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    onMouseEnter={() => {
                      if (!canHover) return;
                      setHoveredSlug(project.slug);
                      setHoveredAiLabel(null);
                      focusProject(project.slug);
                    }}
                    onMouseLeave={() => {
                      if (!canHover) return;
                      setHoveredSlug(null);
                    }}
                    onFocus={() => {
                      setHoveredSlug(project.slug);
                      setHoveredAiLabel(null);
                      focusProject(project.slug);
                    }}
                    onBlur={() => setHoveredSlug(null)}
                    className={`w-full max-w-[90.256vw] uppercase transition-opacity duration-700 ease-out md:max-w-none ${
                      dimmed ? "opacity-[0.16]" : focused ? "opacity-100" : "opacity-[0.88]"
                    }`}
                  >
                    <p className="font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                      {String(index + 1).padStart(3, "0")}
                    </p>
                    <p className="mt-0.5 font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                      {project.title.toUpperCase()}
                    </p>
                    <p className={`mt-0.5 font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw] ${
                      aiHoverActive ? "text-white" : "text-black"
                    }`}>
                      {formatUrl(project.siteUrl).toUpperCase()}
                    </p>
                    <p className="mt-0.5 normal-case text-[2.544vw] leading-[0.9] text-black/55 md:text-[0.594vw]">
                      {getProjectLabel(project)}
                    </p>
                  </Link>
                );
              })}
              <div className="w-full max-w-[90.256vw] md:max-w-none md:col-span-2 xl:col-span-1">
                <p className="font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                  Artificial Intelligence
                </p>
                <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-1">
                  {aiVideos.map((video, index) => {
                    const focused = hoveredAiLabel === video.id;
                    const dimmed =
                      canHover &&
                      ((hoveredAiLabel != null && !focused) || hoveredSlug != null);

                    return (
                      <a
                        key={video.id}
                        href={video.vimeoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => {
                          if (!canHover) return;
                          setHoveredSlug(null);
                          setHoveredAiLabel(video.id);
                        }}
                        onMouseLeave={() => {
                          if (!canHover) return;
                          setHoveredAiLabel(null);
                        }}
                        onFocus={() => {
                          setHoveredSlug(null);
                          setHoveredAiLabel(video.id);
                        }}
                        onBlur={() => setHoveredAiLabel(null)}
                        className={`text-center transition-opacity duration-700 ease-out md:text-left ${
                          dimmed ? "opacity-[0.16]" : "opacity-100"
                        }`}
                      >
                        <p className="font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                          {String(index + 1).padStart(3, "0")}
                        </p>
                        <p className="mt-0.5 font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                          {video.title}
                        </p>
                        <p className="mt-0.5 font-strong text-[2.544vw] leading-[0.9] md:text-[0.594vw]">
                          {video.location.toUpperCase()}
                        </p>
                        <p className="mt-0.5 normal-case text-[2.544vw] leading-[0.9] text-black/55 md:text-[0.594vw]">
                          {video.projectType}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </LenisScroll>
        </motion.div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 z-20 h-[14.359vw] transition-colors duration-500 md:h-[3.5vw] ${
          aiHoverActive ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="h-full px-3 md:px-4">
          <div className="grid h-full grid-cols-[1fr_auto] items-end gap-3 md:grid-cols-[minmax(0,65vw)_minmax(0,1fr)]">
            <div className="hidden items-end md:flex md:pb-1">
              <div className="flex flex-col">
                <a
                  href="mailto:gabriellengoo@hotmail.com"
                  className="type-small font-strong transition-opacity duration-500 md:hover:opacity-5"
                >
                  gabriellengoo@hotmail.com
                </a>
                <a
                  href="https://instagram.com/is_this_gabrielle"
                  target="_blank"
                  rel="noreferrer"
                  className="type-small font-strong uppercase transition-opacity duration-500 md:hover:opacity-5"
                >
                  @is_this_gabrielle
                </a>
              </div>
              <a
                href={BABY_OS_SPOTIFY_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  if (!canHover) return;
                  setShowBabyPrompt(true);
                  setShowSpotifyDemo(true);
                }}
                onMouseLeave={() => {
                  setShowBabyPrompt(false);
                  setShowSpotifyDemo(false);
                }}
                onFocus={() => {
                  setShowBabyPrompt(true);
                  setShowSpotifyDemo(true);
                }}
                onBlur={() => {
                  setShowBabyPrompt(false);
                  setShowSpotifyDemo(false);
                }}
                className="nav-babyos-text nav-babyos-text-home font-test-sohne-fett font-black leading-none transition-opacity duration-500 md:ml-[27vw] md:text-[1.1vw] md:tracking-[-0.088vw] md:hover:opacity-5"
              >
                {showBabyPrompt ? BABY_OS_PROMPT : <ScrambledFooterLabel reduceMotion={!!reduceMotion} />}
              </a>
            </div>
            <div className="type-small font-strong uppercase leading-[0.96] md:hidden">
              <div className="flex items-center gap-4">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-opacity duration-500"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex w-full justify-end md:hidden">
              <a
                href={BABY_OS_SPOTIFY_URL}
                target="_blank"
                rel="noreferrer"
                onTouchStart={() => {
                  setShowBabyPrompt(true);
                }}
                onTouchEnd={() => {
                  setShowBabyPrompt(false);
                }}
                className="nav-babyos-text nav-babyos-text-home block whitespace-nowrap text-right font-test-sohne-fett text-[4.021vw] font-black leading-none tracking-[-0.321vw]"
              >
                {showBabyPrompt ? BABY_OS_PROMPT : <ScrambledFooterLabel reduceMotion={!!reduceMotion} />}
              </a>
            </div>
            <div className="hidden font-strong items-end justify-between gap-6 pb-1 md:flex">
              <div className="type-small uppercase leading-[0.96]">
                Based in London
                <br />
                operating worldwide.
              </div>

              <div className="flex items-end gap-4 type-small font-strong uppercase">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-opacity duration-500 md:hover:opacity-5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
