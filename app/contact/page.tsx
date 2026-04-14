import Link from "next/link";

import { capabilities, projects } from "@/lib/projects";

const links = [
  {
    label: "Email",
    href: "mailto:gabriellengoo@hotmail.com",
    value: "gabriellengoo@hotmail.com"
  },
  {
    label: "GitHub",
    href: "https://github.com/gabriellengoo",
    value: "github.com/gabriellengoo"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/is_this_gabrielle",
    value: "@is_this_gabrielle"
  }
];

const furtherInformation = [
  "Based in London, operating worldwide.",
  "CV available via Canva.",
  "Open to freelance, contract, and long-term roles.",
  "For enquiries and project discussions, email directly."
];

const aboutText =
  "Gabrielle aka BabyOS part of The Internet Architects works between visual direction, interaction, and frontend implementation. Strongest when a project needs restraint, visual judgement, and technical control in the same place.";

const aiPromoText =
  "BabyOS now does AI Promotional videos too! 💅";

const focusText =
  "Culture, fashion, AI-adjacent interfaces, editorial websites, and digital experiences that need more than default frontend patterns.";

const stackItems = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "Sanity",
  "WebGL"
];

export default function ContactPage() {
  return (
    <section className="px-3 pb-14 pt-[21vw] md:px-4 md:pt-[3.5vw]">
      <div className="flex flex-col justify-start gap-6 pt-0 md:min-h-[calc(100svh-3.5vw)] md:justify-between md:gap-0 md:pt-4">
        <div className="grid gap-4 text-left md:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,28vw)] md:items-start">
          <div className="grid gap-2 md:gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-test-sohne-buch text-[3.333vw] uppercase leading-[0.98] tracking-[0.033vw] transition-opacity duration-500 md:text-[1.875vw] md:tracking-[0.019vw] md:hover:opacity-5"
              >
                {link.value}
              </Link>
            ))}
            <Link
              href="https://canva.link/4ixu1h97ksp91rq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit type-small font-strong uppercase md:hidden"
            >
              Download CV
            </Link>
            <p className="nav-babyos-text nav-babyos-text-secondary block w-full pt-[3vw] text-left font-test-sohne-fett text-[18vw] font-black leading-[0.92] tracking-[-1.44vw] md:hidden">
              BabyOS is typeing..
            </p>
            <p className="hidden nav-babyos-text nav-babyos-text-secondary w-full pt-[1.25vw] text-left font-test-sohne-fett text-[7vw] font-black leading-[0.92] tracking-[-0.56vw] md:block">
              BabyOS is typeing..
            </p>
          </div>
          <div className="hidden content-start gap-4 md:grid md:justify-items-end">
            <Link
              href="https://canva.link/4ixu1h97ksp91rq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit type-small font-strong uppercase transition-opacity duration-500 md:hover:opacity-5"
            >
              Download CV
            </Link>
          </div>
        </div>
        <div className="pt-0 md:pt-10">
          <p className="type-small max-w-[42ch] font-strong text-pink-500 pb-[1vw]">
            {aiPromoText}
          </p>
          <p className="type-small max-w-[42ch] font-strong md:mb-0 pb-[1vw]">
            {aboutText}
          </p>
        </div>
        <div className="hidden content-end gap-4 pb-10 md:grid md:grid-cols-5 md:gap-8 md:pb-12">
          <p className="type-small font-strong uppercase text-black/45">Recent Works</p>
          <p className="type-small font-strong uppercase text-black/45">Stack</p>
          <p className="type-small font-strong uppercase text-black/45">Fields of Practice</p>
          <p className="type-small font-strong uppercase text-black/45">Focus and Specialties</p>
          <p className="type-small font-strong uppercase text-black/45">Further Information</p>
        </div>
      </div>
      <div className="flex min-h-[100svh] flex-col justify-between pt-0 md:pt-4">
        <div className="grid content-start gap-10 md:grid-cols-5 md:gap-8">
          <div>
            <p className="mb-3 type-small font-strong uppercase text-black/45 md:hidden">Recent Works</p>
            <div className="grid gap-1">
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="type-small font-strong underline decoration-black underline-offset-2"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 type-small font-strong uppercase text-black/45 md:hidden">Stack</p>
            <div className="grid gap-1">
              {stackItems.map((item) => (
                <p key={item} className="type-small font-strong">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 type-small font-strong uppercase text-black/45 md:hidden">Fields of Practice</p>
            <div className="grid gap-1">
              {capabilities.map((item) => (
                <p key={item} className="type-small font-strong">
                  {item}
                </p>
              ))}
              <p className="type-small font-strong">Artificial Intelligence</p>
            </div>
          </div>
          <div>
            <p className="mb-3 type-small font-strong uppercase text-black/45 md:hidden">Focus and Specialties</p>
            <p className="type-small max-w-[28ch] font-strong">{focusText}</p>
          </div>
          <div className="grid content-start gap-6">
            <p className="mb-[-3.077vw] type-small font-strong uppercase text-black/45 md:hidden">Further Information</p>
            <div className="grid gap-1">
              {furtherInformation.map((item) => (
                <p key={item} className="type-small font-strong">
                  {item}
                </p>
              ))}
            </div>
            <p className="type-small max-w-[26ch] font-strong">
              Available for commissions, creative development, and frontend roles across fashion, culture, and digital experience work.
            </p>
            <p className="type-small max-w-[24ch] font-strong">
              For enquiries:
              <br />
              <Link href="mailto:gabriellengoo@hotmail.com" className="underline decoration-black underline-offset-2">
                gabriellengoo@hotmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
