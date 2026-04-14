import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const links = [
    { href: "mailto:gabriellengoo@hotmail.com", label: "E-mail" },
    { href: "https://instagram.com/is_this_gabrielle", label: "Instagram", external: true },
    { href: "https://www.are.na/2sx6_wz8byo/channels", label: "Are.na", external: true }
  ];

  return (
    <footer className="mt-auto text-black">
      <div className="px-3 pb-3 pt-4 md:px-4 md:pb-4 md:pt-5">
        <div className="grid max-w-full grid-cols-[auto_minmax(0,1fr)] items-end gap-0 overflow-x-hidden type-small md:grid-cols-[auto_1fr_auto] md:items-end md:gap-3">
          <div className="flex items-end md:hidden">
            <Image
              src="/images/site/logo.png"
              alt="BabyOS logo"
              width={68}
              height={68}
              className="h-auto w-[56px]"
            />
          </div>
          <div className="col-span-1 self-end grid min-w-0 max-w-full justify-items-end gap-0 overflow-hidden text-right text-[9px] leading-[1.02] md:hidden">
            <p className="max-w-full break-words font-strong tracking-[-0.02em] text-black/35">© 2026 BabyOS / Internet Architect</p>
            <div className="flex max-w-full flex-wrap justify-end gap-x-1 font-strong">
              {links.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="max-w-full break-words"
                >
                  {link.label}
                  {index < links.length - 1 ? "," : ""}
                </Link>
              ))}
            </div>
            <p className="max-w-full break-words font-strong tracking-[-0.02em] text-black/35">
              Development by BabyOS in 3 days - just saying
            </p>
          </div>
          <p className="hidden font-strong tracking-[-0.02em] text-black/35 md:block">© 2026 BabyOS / Internet Architect</p>
          <div className="hidden items-end justify-center font-strong md:flex">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="md:hover:opacity-5"
              >
                {link.label}
                {index < links.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>
          <p className="hidden font-strong tracking-[-0.02em] text-black/35 md:block">Development by BabyOS in 3 days - just saying</p>
        </div>
      </div>
    </footer>
  );
}
