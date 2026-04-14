"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" }
];

export function FloatingDock() {
  const pathname = usePathname() ?? "";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-[2.625vw] text-black md:block">
      <div className="h-full px-2 pt-2">
        <div className="grid h-full grid-cols-1 gap-3 items-start md:grid-cols-[minmax(0,65vw)_minmax(0,1fr)]">
          <div />
          <div className="pointer-events-auto flex font-strong items-start justify-end gap-4 type-small uppercase">
          {items.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-35 hover:opacity-100"}`}
              >
                {item.label}
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
