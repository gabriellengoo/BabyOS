import { PageIntro } from "@/components/ui/page-intro";
import { WorkFilter } from "@/components/sections/work-filter";
import { aiVideos } from "@/lib/ai-videos";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return <WorkFilter projects={projects} aiVideos={aiVideos} />;
}
