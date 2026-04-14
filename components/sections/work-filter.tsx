"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { AiVideo } from "@/lib/ai-videos";
import { LenisScroll } from "@/components/ui/lenis-scroll";
import { Project, ProjectCategory } from "@/lib/projects";
import { ProjectImage } from "@/components/ui/project-image";

const filters: Array<ProjectCategory | "All" | "AI"> = [
  "All",
  "Creative Development",
  "Client Work",
  "AI"
];

function RevealItem({
  children,
  index,
  rootRef
}: {
  children: React.ReactNode;
  index: number;
  rootRef: React.RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const itemRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(itemRef, {
    once: true,
    amount: 0.25,
    root: rootRef
  });

  return (
    <motion.div
      ref={itemRef}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.55, delay: Math.min(index * 0.035, 0.24), ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

export function WorkFilter({
  projects,
  aiVideos
}: {
  projects: Project[];
  aiVideos: AiVideo[];
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const listWrapperRef = useRef<HTMLElement | null>(null);

  const filteredProjects = useMemo(() => {
    const scopedProjects = (() => {
      if (activeFilter === "All") return projects;
      if (activeFilter === "AI") {
        return [];
      }

      return projects.filter((project) => project.category === activeFilter);
    })();

    return [...scopedProjects].sort((a, b) => Number(b.year) - Number(a.year));
  }, [activeFilter, projects]);

  const visibleAiVideos = activeFilter === "All" || activeFilter === "AI" ? aiVideos : [];

  useEffect(() => {
    setHoveredItemId(null);
  }, [activeFilter]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section className="h-[100svh] min-h-[100svh] overflow-hidden px-3 pb-14 pt-[50px] md:h-[calc(100svh-56px)] md:min-h-0 md:px-2 md:pb-0 md:pt-[56px]">
      <div className="grid h-full min-h-0 min-w-0 gap-8 md:grid-cols-[minmax(220px,27vw)_minmax(0,1fr)] md:items-stretch md:gap-3">
        <div className="flex flex-col gap-4 md:h-full md:pr-4">
          <div className="space-y-4">
            <p className="type-small font-strong text-black md:w-auto w-[60vw]">
              A compressed index of creative development, client work, and experimental projects.
            </p>
          </div>
          <div className="pt-8 md:pt-[22vh]">
            <p className="type-small font-strong">Filter</p>
            <div className="mt-3 grid gap-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`w-fit text-left type-small font-strong transition-opacity md:hover:opacity-50 ${
                    activeFilter === filter ? "text-black" : "text-black/45"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <LenisScroll
          wrapperRef={listWrapperRef}
          className="scrollbar-none min-h-0 min-w-0 max-w-full overflow-y-auto md:h-full md:min-h-0"
          contentClassName="grid min-w-0 max-w-full auto-rows-min gap-x-6 gap-y-5 pr-1 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <RevealItem key={project.slug} index={index} rootRef={listWrapperRef}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => {
                  if (!canHover) return;
                  setHoveredItemId(project.slug);
                }}
                onMouseLeave={() => {
                  if (!canHover) return;
                  setHoveredItemId(null);
                }}
                onFocus={() => setHoveredItemId(project.slug)}
                onBlur={() => setHoveredItemId(null)}
                className={`grid min-w-0 max-w-full grid-cols-[72px_minmax(0,1fr)] gap-3 pb-4 transition-opacity duration-500 ${
                  !canHover || hoveredItemId == null || hoveredItemId === project.slug ? "opacity-100" : "opacity-[0.2]"
                }`}
              >
                <div className="pointer-events-none relative h-[54px] overflow-hidden">
                  <ProjectImage
                    alt={`${project.title} thumbnail`}
                    fallbackSrc={project.fallbackImage}
                    primarySrc={project.previewImage}
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <div className="grid min-w-0 gap-0 [line-height:0.82!important]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-0">
                      <p className="m-0 type-small font-strong [line-height:0.82!important] text-black">
                        {String(index + 1).padStart(3, "0")}
                      </p>
                    </div>
                    <p className="m-0 type-small font-strong [line-height:0.82!important] text-black">{project.year}</p>
                  </div>
                  <p className="m-0 min-w-0 break-words type-small font-strong [line-height:0.82!important] text-black">{project.title}</p>
                  <p className="m-0 min-w-0 break-words type-small font-strong [line-height:0.82!important] text-black/25">{project.client}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
          {visibleAiVideos.map((video, index) => (
            <RevealItem key={video.id} index={filteredProjects.length + index} rootRef={listWrapperRef}>
              <a
                href={video.vimeoUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  if (!canHover) return;
                  setHoveredItemId(video.id);
                }}
                onMouseLeave={() => {
                  if (!canHover) return;
                  setHoveredItemId(null);
                }}
                onFocus={() => setHoveredItemId(video.id)}
                onBlur={() => setHoveredItemId(null)}
                className={`grid min-w-0 max-w-full grid-cols-[96px_minmax(0,1fr)] gap-3 pb-4 transition-opacity duration-500 ${
                  !canHover || hoveredItemId == null || hoveredItemId === video.id ? "opacity-100" : "opacity-[0.2]"
                }`}
              >
                <div className="pointer-events-none relative h-[54px] w-[96px] overflow-hidden bg-black">
                  <iframe
                    src={video.embedUrl}
                    title={`${video.title} preview`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.22] border-0"
                  />
                </div>
                <div className="grid min-w-0 gap-0 [line-height:0.82!important]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="m-0 min-w-0 break-words type-fine font-bold [line-height:0.82!important] text-black">{video.title}</p>
                    <p className="m-0 type-fine [line-height:0.82!important] text-black">Video</p>
                  </div>
                  <p className="m-0 min-w-0 break-words type-small [line-height:0.82!important] text-black">AI moving-image study</p>
                </div>
              </a>
            </RevealItem>
          ))}
        </LenisScroll>
      </div>
    </section>
  );
}
