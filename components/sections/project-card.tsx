import Link from "next/link";

import { ProjectImage } from "@/components/ui/project-image";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  indexLabel?: string;
  aiLabel?: string | null;
  priority?: boolean;
  className?: string;
  featured?: boolean;
};

export function ProjectCard({
  project,
  indexLabel,
  aiLabel,
  priority,
  className,
  featured = false
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${className ?? ""}`}
    >
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded border border-black/10">
          <div className={featured ? "aspect-[16/10]" : "aspect-[4/5]"}>
            <ProjectImage
              alt={`${project.title} site preview`}
              fallbackSrc={project.fallbackImage}
              primarySrc={project.previewImage}
              className="mono-image h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {indexLabel ? <p className="type-fine text-black/45">{indexLabel}</p> : null}
              {aiLabel ? <p className="type-fine font-bold text-black">{aiLabel}</p> : null}
            </div>
            <p className="type-fine text-black/45">{project.year}</p>
          </div>
          <p className={`${featured ? "type-large" : "type-small"} font-bold`}>
            {project.title}
          </p>
          <p className="type-small text-black/45">{project.client}</p>
          <p className="type-small max-w-2xl text-black/65">{project.summary}</p>
        </div>
      </div>
    </Link>
  );
}
