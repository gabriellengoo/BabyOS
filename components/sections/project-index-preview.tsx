import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { secondaryProjects } from "@/lib/projects";

export function ProjectIndexPreview() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[100vw]">
        <Reveal className="space-y-4 border-t border-black/10 pt-6">
          {secondaryProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="grid gap-2 border-b border-black/10 py-5 md:grid-cols-[3.5vw_minmax(0,1fr)_minmax(13.75vw,0.5fr)] md:items-start"
            >
              <p className="type-fine text-black/45">{String(index + 3).padStart(2, "0")}</p>
              <div className="space-y-1">
                <p className="type-small font-bold">{project.title}</p>
                <p className="type-small max-w-2xl text-black/65">{project.summary}</p>
              </div>
              <div className="flex items-center justify-between gap-4 md:block md:text-right">
                <p className="type-fine text-black/45">{project.category}</p>
                <p className="type-fine text-black/45">{project.year}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
