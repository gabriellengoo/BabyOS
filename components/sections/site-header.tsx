"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname() ?? "";

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[42px] bg-white">
      <div className="h-full px-2 pt-2">
        <div className="grid h-full grid-cols-1 gap-3 items-start md:grid-cols-[minmax(0,65vw)_minmax(0,1fr)]">
          <div className="flex items-center justify-between md:items-start md:justify-start">
            <Link href="/" className="min-w-0 flex items-start text-black">
              <div className="hidden type-small font-strong uppercase leading-[0.96] md:block">
                Based in London
                <br />
                operating worldwide.
              </div>
              <p className="nav-babyos-text font-test-sohne-fett text-[1.2rem] font-black leading-none tracking-[-0.08em] md:ml-[27vw] md:text-[1rem]">
                <span className="md:hidden">BabyOS</span>
                <span className="hidden md:inline">BabyOS is typeing..</span>
              </p>
            </Link>
            <div className="pointer-events-auto flex items-center justify-end gap-4 type-small font-strong uppercase md:hidden">
              {items.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-35"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
