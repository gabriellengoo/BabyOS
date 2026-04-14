import { Reveal } from "@/components/ui/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-black/10 px-5 pb-8 pt-28 md:px-8 md:pt-32">
      <Reveal className="mx-auto grid max-w-[100vw] gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="type-fine text-black/45">{eyebrow}</p>
          <h1 className="type-large max-w-5xl font-bold">{title}</h1>
        </div>
        <p className="type-small max-w-xl text-black/65 md:self-end">
          {description}
        </p>
      </Reveal>
    </section>
  );
}
