# Gabrielle Ngoo Portfolio

Production-ready portfolio website for Gabrielle Ngoo, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and a lightweight Three.js hero sculpture.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Production checks

Run these before shipping:

```bash
npm run typecheck
npm run build
```

## Content and image editing

- Project data lives in `lib/projects.ts`
- Homepage hero, section copy, and CTA copy live in the `app` and `components/sections` files
- Placeholder visuals live in `public/images/projects`
- Replace the CV placeholder at `public/Gabrielle-Ngoo-CV.pdf`

## Swapping in real images

1. Add your image files into `public/images/projects`
2. Update the relevant `heroImage` and `gallery` paths in `lib/projects.ts`
3. If you switch from SVG placeholders to photography, keep image ratios generous for the editorial layout:
   - featured cards: roughly `4:5`
   - project hero: roughly `16:10`
   - gallery panels: mixed `4:5` and wide crops

## Notes

- The strongest projects are seeded as featured on the homepage: `Ancestors Community Sound` and `MØRNING / bot.morning.fyi`
- The contact form currently uses frontend validation only
- The site intentionally keeps Three.js limited to the hero sculpture for performance and clarity
