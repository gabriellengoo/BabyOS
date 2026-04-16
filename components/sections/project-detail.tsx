"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { LenisScroll } from "@/components/ui/lenis-scroll";
import { SitePreviewFrame } from "@/components/ui/site-preview-frame";
import { Project, getAdjacentProjects } from "@/lib/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const [desktopPreviewHovered, setDesktopPreviewHovered] = useState(false);
  const followerX = useMotionValue(0);
  const followerY = useMotionValue(0);
  const springX = useSpring(followerX, { stiffness: 320, damping: 30, mass: 0.25 });
  const springY = useSpring(followerY, { stiffness: 320, damping: 30, mass: 0.25 });
  const adjacent = getAdjacentProjects(project.slug);
  const categoryLabel = project.usesArtificialIntelligence
    ? `${project.category} / Artificial Intelligence`
    : project.category;

  return (
    <>
      <LenisScroll
        as="article"
        className="h-[100dvh] min-h-[100dvh] w-full max-w-full overflow-x-hidden overflow-y-auto pt-[18vw] md:hidden"
        contentClassName="min-h-full w-full"
      >
        <div className="grid min-h-full w-full min-w-0 gap-4">
          <div className="order-first flex min-h-0 min-w-0 flex-col gap-3 px-4 pt-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <SitePreviewFrame
                title={project.title}
                siteUrl={project.siteUrl}
                previewVideoUrl={project.previewVideoUrl}
                previewVideoUrls={project.previewVideoUrls}
                fallbackSrc={project.fallbackImage}
                primarySrc={project.previewImage}
                previewVideoFit="contain"
                preferImage={project.preferImagePreview}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <nav className="grid min-w-0 grid-cols-2 gap-2">
              <Link href={`/work/${adjacent.previous.slug}`} className="surface-blur min-w-0 rounded-none px-4 py-2">
                <p className="type-small text-black/45">Previous</p>
                <p className="type-small break-words">{adjacent.previous.title}</p>
              </Link>
              <Link href={`/work/${adjacent.next.slug}`} className="surface-blur min-w-0 rounded-none px-4 py-2">
                <p className="type-small text-black/45">Next</p>
                <p className="type-small break-words">{adjacent.next.title}</p>
              </Link>
            </nav>
          </div>
          <div className="flex min-h-0 min-w-0 flex-col gap-4 px-4 pb-4 pt-0">
            <div className="space-y-4">
              <p className="font-strong text-[6vw] leading-[0.92] tracking-[-0.04em] text-black">
                {categoryLabel}
              </p>
              <p className="type-small break-words">{project.title}</p>
              <p className="type-small break-words text-black/55">{project.summary}</p>
            </div>
            <dl className="grid gap-3">
              <div>
                <dt className="type-small text-black/45">Year</dt>
                <dd className="type-small">{project.year}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Client</dt>
                <dd className="type-small">{project.client}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Role</dt>
                <dd className="type-small">{project.role}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Tech</dt>
                <dd className="type-small text-black/55">{project.tech.join(", ")}</dd>
              </div>
            </dl>
            <div className="space-y-6 pb-4">
              <div>
                <p className="type-small text-black/45">Overview</p>
                <p className="type-small mt-1 break-words text-black/55">{project.overview}</p>
              </div>
              <div>
                <p className="type-small text-black/45">Interesting</p>
                <p className="type-small mt-1 break-words text-black/55">{project.interesting}</p>
              </div>
              <div>
                <p className="type-small text-black/45">Impact</p>
                <p className="type-small mt-1 break-words text-black/55">{project.impact}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:hidden">
                <Link href={project.siteUrl} target="_blank" rel="noreferrer" className="surface-blur min-w-0 rounded-none px-4 py-3 text-center type-small">
                  {project.liveLabel}
                </Link>
                <Link href="/contact" className="min-w-0 rounded-none border border-black/10 px-4 py-3 text-center type-small">
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LenisScroll>

      <article className="hidden md:block md:h-[calc(100vh)] md:min-h-0 md:overflow-hidden md:pl-2 md:pr-4 md:pt-[3.5vw] md:pb-0">
        <div className="grid h-full min-h-full gap-4 md:h-full md:min-h-0 md:grid-cols-[22.5vw_minmax(0,1fr)]">
          <LenisScroll
            className="flex min-h-0 flex-col gap-4 md:h-full md:overflow-y-auto md:px-0 md:pt-4 md:pr-4"
            contentClassName="flex flex-col gap-4 md:pb-[12vw]"
          >
            <div className="space-y-4">
              <p className="font-strong text-[1.5vw] leading-[0.92] tracking-[-0.08vw] text-black">
                {categoryLabel}
              </p>
              <p className="type-small">{project.title}</p>
              <p className="type-small text-black/55">{project.summary}</p>
            </div>
            <dl className="grid gap-3">
              <div>
                <dt className="type-small text-black/45">Year</dt>
                <dd className="type-small">{project.year}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Client</dt>
                <dd className="type-small">{project.client}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Role</dt>
                <dd className="type-small">{project.role}</dd>
              </div>
              <div>
                <dt className="type-small text-black/45">Tech</dt>
                <dd className="type-small text-black/55">{project.tech.join(", ")}</dd>
              </div>
            </dl>
            <div className="space-y-6">
              <div>
                <p className="type-small text-black/45">Overview</p>
                <p className="type-small mt-1 text-black/55">{project.overview}</p>
              </div>
              <div>
                <p className="type-small text-black/45">Interesting</p>
                <p className="type-small mt-1 text-black/55">{project.interesting}</p>
              </div>
              <div>
                <p className="type-small text-black/45">Impact</p>
                <p className="type-small mt-1 text-black/55">{project.impact}</p>
              </div>
            </div>
          </LenisScroll>
          <div className="order-first flex min-h-0 flex-col gap-2 md:order-none md:h-full md:justify-center md:px-[3vw] md:pt-[2.5vw] md:pb-[2.5vw]">
            <div
              className="relative aspect-[16/10] overflow-hidden md:mx-auto md:h-auto md:w-[64%] md:flex-none md:self-center md:aspect-[16/10]"
              onMouseEnter={() => setDesktopPreviewHovered(true)}
              onMouseLeave={() => setDesktopPreviewHovered(false)}
              onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                followerX.set(event.clientX - bounds.left);
                followerY.set(event.clientY - bounds.top);
              }}
            >
              <Link
                href={project.siteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.liveLabel}: ${project.title}`}
                className="absolute inset-0 z-20 hidden md:block"
              />
              <SitePreviewFrame
                title={project.title}
                siteUrl={project.siteUrl}
                previewVideoUrl={project.previewVideoUrl}
                previewVideoUrls={project.previewVideoUrls}
                fallbackSrc={project.fallbackImage}
                primarySrc={project.previewImage}
                preferImage={project.preferImagePreview}
                previewVideoFit="contain"
                className="absolute  inset-0 h-full w-full"
              />
              {!reduceMotion ? (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
                  style={{
                    x: springX,
                    y: springY,
                    opacity: desktopPreviewHovered ? 1 : 0
                  }}
                >
                  <div className="surface-blur -translate-x-1/2 -translate-y-1/2 rounded-none px-4 py-3 type-small">
                    {project.liveLabel}
                  </div>
                </motion.div>
              ) : null}
            </div>
            <nav className="mt-auto grid gap-2 md:mt-1 md:grid-cols-2 md:pt-0">
              <Link href={`/work/${adjacent.previous.slug}`} className="surface-blur rounded-none px-4 py-2">
                <p className="type-small text-black/45">Previous</p>
                <p className="type-small">{adjacent.previous.title}</p>
              </Link>
              <Link href={`/work/${adjacent.next.slug}`} className="surface-blur rounded-none px-4 py-2">
                <p className="type-small text-black/45">Next</p>
                <p className="type-small">{adjacent.next.title}</p>
              </Link>
            </nav>
          </div>
        </div>
      </article>
    </>
  );
}
