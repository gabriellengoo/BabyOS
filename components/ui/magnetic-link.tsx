"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEvent, useRef } from "react";

import { cn } from "@/lib/utils";

type MagneticLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  };

export function MagneticLink({
  children,
  className,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${x * 0.06}px, ${y * 0.06}px, 0)`;
    onMouseMove?.(event);
  }

  function handleMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (node) {
      node.style.transform = "translate3d(0,0,0)";
    }
    onMouseLeave?.(event);
  }

  return (
    <Link
      ref={ref}
      className={cn(
        "inline-flex transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
