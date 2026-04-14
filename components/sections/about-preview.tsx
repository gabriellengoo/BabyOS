import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

export function AboutPreview() {
  return (
    <section className="px-5 py-12 md:px-8">
      <Reveal className="mx-auto max-w-[1600px] border-t border-black/10 pt-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="type-fine text-black/45">About</p>
            <p className="type-large max-w-4xl font-bold">
              Designed with restraint.
              <br />
              Built with control.
            </p>
          </div>
          <div className="space-y-4">
            <p className="type-small max-w-xl text-black/65">
              Gabrielle’s practice sits between visual direction and frontend
              engineering. The value is not just taste or code separately, but
              being able to hold both in one pair of hands.
            </p>
            <Link href="/contact" className="surface-blur inline-flex rounded px-4 py-3 type-fine">
              Contact
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
