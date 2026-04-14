"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { featuredProjects } from "@/lib/projects";

export function FeaturedProjects() {
  const reduceMotion = useReducedMotion();
  const [primary, secondary] = featuredProjects;

  return (
    <section className="px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-[100vw] gap-6 xl:grid-cols-[20vw_1fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-6"
        >
          <div className="space-y-4">
            <p className="type-small max-w-[16ch] font-bold">
              Based in London and operating across fashion, culture, and digital experience.
            </p>
            <p className="type-fine text-black/45">Featured</p>
          </div>

          <Link href={`/work/${secondary.slug}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded border border-black/10">
              <Image
                src={secondary.previewImage}
                alt={`${secondary.title} preview`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.015]"
                sizes="(max-width: 1280px) 100vw, 18vw"
              />
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.08 }}
          className="relative overflow-hidden rounded border border-black/10"
        >
          <div className="relative aspect-[16/10] md:aspect-[16/9]">
            <Image
              src={primary.previewImage}
              alt={`${primary.title} preview`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 74vw"
            />
          </div>
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <p className="type-fine text-white/85">
              001
            </p>
            <p className="type-small mt-1 max-w-[12ch] font-bold text-white">
              {primary.title}
            </p>
            <p className="type-small text-white/75">{primary.client}</p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6">
            <Link
              href={`/work/${primary.slug}`}
              className="surface-blur inline-flex rounded px-5 py-4 type-fine text-white"
            >
              See details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
