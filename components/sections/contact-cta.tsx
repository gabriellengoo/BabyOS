import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

export function ContactCta() {
  return (
    <section className="px-5 py-12 md:px-8">
      <Reveal className="mx-auto max-w-[100vw] border-t border-black/10 pt-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="type-fine text-black/45">Contact</p>
            <p className="type-large max-w-4xl font-bold">
              For roles, commissions,
              <br />
              and thoughtful collaborations.
            </p>
          </div>
          <div className="space-y-4">
            <p className="type-small max-w-xl text-black/65">
              Gabrielle is best suited to projects where visual intelligence and
              implementation quality need to meet cleanly.
            </p>
            <Link href="/contact" className="surface-blur inline-flex rounded px-4 py-3 type-fine">
              Contact Gabrielle
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
