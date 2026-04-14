import Link from "next/link";

import { SitePreviewFrame } from "@/components/ui/site-preview-frame";
import { Project, getAdjacentProjects } from "@/lib/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const adjacent = getAdjacentProjects(project.slug);

  return (
    <article className="min-h-[100svh] px-3 pb-14 pt-[50px] md:min-h-[calc(100svh-56px)] md:px-4 md:pt-[56px]">
      <div className="grid min-h-[calc(100svh-50px)] gap-4 md:min-h-[calc(100svh-56px)] md:grid-cols-[360px_minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col gap-4 border-r border-black/10 pr-4">
          <div className="space-y-3">
            <p className="type-small text-black/45">{project.category}</p>
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
            <div className="flex flex-wrap gap-3">
              <Link href={project.siteUrl} target="_blank" rel="noreferrer" className="surface-blur rounded px-4 py-3 type-small">
                {project.liveLabel}
              </Link>
              <Link href="/contact" className="rounded border border-black/10 px-4 py-3 type-small">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-3">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <SitePreviewFrame
              title={project.title}
              siteUrl={project.siteUrl}
              fallbackSrc={project.fallbackImage}
              primarySrc={project.previewImage}
              className="h-full w-full"
            />
          </div>
          <nav className="mt-auto grid gap-2 md:grid-cols-2">
            <Link href={`/work/${adjacent.previous.slug}`} className="surface-blur rounded px-4 py-2">
              <p className="type-small text-black/45">Previous</p>
              <p className="type-small">{adjacent.previous.title}</p>
            </Link>
            <Link href={`/work/${adjacent.next.slug}`} className="surface-blur rounded px-4 py-2">
              <p className="type-small text-black/45">Next</p>
              <p className="type-small">{adjacent.next.title}</p>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
