type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-b border-black/10 pb-6 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <p className="type-fine text-black/45">{eyebrow}</p>
        <h2 className="type-large max-w-5xl font-bold">{title}</h2>
      </div>
      {description ? (
        <p className="type-small max-w-xl text-black/65 md:self-end md:justify-self-end">
          {description}
        </p>
      ) : null}
    </div>
  );
}
