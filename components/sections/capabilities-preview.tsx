import { capabilities, techStack } from "@/lib/projects";

import { Reveal } from "@/components/ui/reveal";

export function CapabilitiesPreview() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[100vw] border-t border-black/10 pt-6">
        <Reveal className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="type-fine text-black/45">Capabilities</p>
            <div className="grid gap-2">
              {capabilities.map((capability) => (
                <p key={capability} className="type-small font-bold">
                  {capability}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="type-fine text-black/45">Stack</p>
            <p className="type-small max-w-xl text-black/65">
              {techStack.join(" / ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
