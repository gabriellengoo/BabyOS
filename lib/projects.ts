export type ProjectCategory =
  | "Creative Development"
  | "Client Work"
  | "Experimental";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  summary: string;
  role: string;
  tech: string[];
  featured?: boolean;
  previewImage: string;
  fallbackImage: string;
  logoImage?: string;
  preferImagePreview?: boolean;
  siteUrl: string;
  overview: string;
  interesting: string;
  process: string;
  impact: string;
  liveLabel: string;
};

const baseProjects: Omit<Project, "fallbackImage">[] = [
  {
    slug: "ancestors-community-sound",
    title: "Ancestors Community Sound",
    category: "Creative Development",
    year: "2021",
    client: "National Youth Theatre",
    summary:
      "Immersive digital storytelling using 3D scanning, sound, and spatial interaction.",
    role: "Research, web design, full-stack development",
    tech: ["Node.js", "Three.js", "A-Frame", "Blender", "WebGL"],
    featured: true,
    previewImage: "/images/previews/ancestors.png",
    preferImagePreview: true,
    siteUrl: "https://theancestorssound.nyt.org.uk/",
    overview:
      "A spatial web piece exploring heritage, testimony, and environment through movement, sound, and scanned space.",
    interesting:
      "The experience treated interaction as atmosphere rather than interface. Sound, pacing, and spatial depth were doing narrative work.",
    process:
      "I worked across research, visual direction, interface design, and technical build, bringing 3D environments and web interaction into one coherent piece.",
    impact:
      "This remains one of the clearest examples of Gabrielle’s creative development practice: technically ambitious, emotionally precise, and culturally grounded.",
    liveLabel: "Visit live site"
  },
  {
    slug: "morning-bot",
    title: "MØRNING / bot.morning.fyi",
    category: "Creative Development",
    year: "2023",
    client: "Client Commission",
    summary:
      "A WebGL and AI-driven digital experience built around machine presence, interaction, and experimental interface design.",
    role: "AI integration, research, web design, full-stack development",
    tech: ["Next.js", "Tailwind", "Three.js", "TensorFlow", "Socket.io"],
    featured: true,
    previewImage: "/images/previews/morning.png",
    preferImagePreview: true,
    siteUrl: "https://bot.morning.fyi",
    overview:
      "A digital environment exploring the relationship between humans and machines through responsive states, realtime motion, and atmospheric interaction.",
    interesting:
      "The project carried an unstable, almost sentient tone without tipping into gimmick. The interface behaviour itself was part of the concept.",
    process:
      "I designed the experience, structured the frontend system, and integrated the AI and realtime behaviours into a tightly art-directed web build.",
    impact:
      "It demonstrates range across visual concept, technical experimentation, and interaction design in a way that is immediately relevant to creative studios.",
    liveLabel: "Visit live site"
  },
  {
    slug: "palazzo-eventi",
    title: "Palazzo Eventi",
    category: "Client Work",
    year: "2023",
    client: "Palazzo Eventi",
    summary:
      "Image-led website for a luxury events brand with elegant pacing and editorial layout.",
    role: "Web design, full-stack development",
    tech: ["Nuxt.js", "Sanity", "Tailwind", "SCSS"],
    previewImage: "/images/previews/palazzo.png",
    logoImage: "/images/projects/palazzoeventilogo.jpg",
    siteUrl: "https://palazzonew.vercel.app",
    overview:
      "A luxury-facing site built around imagery, quiet motion, and restraint rather than decorative excess.",
    interesting:
      "The challenge was letting the brand feel premium without leaning on visual clichés. The structure needed to stay spare and highly controlled.",
    process:
      "I developed the web design, responsive system, and content architecture, focusing on presentation quality and pacing across devices.",
    impact:
      "The finished site feels more like a visual portfolio than a service brochure, which is the right tone for this type of client work.",
    liveLabel: "Visit live site"
  },
  {
    slug: "alwa",
    title: "ALWA",
    category: "Client Work",
    year: "2023",
    client: "ALWA",
    summary:
      "Portfolio site for an art direction agency with a stripped image-centric system.",
    role: "Web design, full-stack development",
    tech: ["Nuxt.js", "Sanity", "Tailwind", "SCSS"],
    previewImage: "/images/previews/alwa.png",
    logoImage: "/images/projects/alwa-logo.svg",
    siteUrl: "https://www.alwaproduction.co.uk",
    overview:
      "A site built to foreground visual work with as little friction as possible.",
    interesting:
      "The system had to feel authored without overpowering the agency’s own material.",
    process:
      "I designed and built the frontend, shaping the layout logic so the site stayed minimal while remaining flexible for future updates.",
    impact:
      "It shows Gabrielle’s ability to build restrained client work with strong typographic and spatial discipline.",
    liveLabel: "Visit live site"
  },
  {
    slug: "tasc-fashion-ai",
    title: "TASC Fashion AI",
    category: "Client Work",
    year: "2026",
    client: "TASC",
    summary:
      "Fashion-facing AI web experience combining editorial presentation, image systems, and experimental digital storytelling.",
    role: "Creative direction, frontend development, AI-assisted experience design",
    tech: ["Next.js", "AI workflows", "Frontend systems", "Responsive design"],
    previewImage: "/images/projects/tasc.png",
    preferImagePreview: true,
    siteUrl: "https://tasc-fashion.ai/",
    overview:
      "A fashion and AI-led web project built around visual presentation, editorial structure, and a more experimental digital tone.",
    interesting:
      "The strength of the site is in how it frames fashion content through a more technical and future-facing interface language.",
    process:
      "I shaped the frontend presentation and visual pacing to balance editorial clarity with a more speculative, AI-adjacent feel.",
    impact:
      "It adds a strong fashion-tech example to the portfolio and makes the crossover between creative development and commercial presentation more legible.",
    liveLabel: "Visit live site"
  },
  {
    slug: "henhouse",
    title: "Henhouse",
    category: "Client Work",
    year: "2023",
    client: "Henhouse",
    summary:
      "Minimal portfolio website with strong typography, hierarchy, and tightly curated presentation.",
    role: "Research, web design, full-stack development",
    tech: ["Nuxt.js", "Sanity", "Tailwind", "SCSS"],
    previewImage: "/images/previews/henhouse.png",
    logoImage: "/images/projects/henhouselogo.jpeg",
    siteUrl: "https://www.henhouselondon.co.uk",
    overview:
      "A quieter portfolio build where type, spacing, and image handling carry the identity.",
    interesting:
      "Minimalism is easy to flatten. The project depended on precise proportion and sequencing to stay confident.",
    process:
      "I worked from research through frontend implementation, building a system that feels calm, exact, and brand-sensitive.",
    impact:
      "This project reinforces Gabrielle’s ability to execute visually disciplined portfolio sites without defaulting to templates.",
    liveLabel: "Visit live site"
  },
  {
    slug: "distant-realities",
    title: "Distant Realities",
    category: "Client Work",
    year: "2022",
    client: "Distant Realities",
    summary:
      "Futuristic agency website with immersive pacing and a more speculative visual language.",
    role: "Research, web design, full-stack development",
    tech: ["Next.js", "React", "Sanity", "Tailwind", "P5.js"],
    previewImage: "/images/previews/distant.png",
    siteUrl: "https://www.distant-realities.eu/",
    overview:
      "An agency site shaped around dimensional layouts, speculative visual references, and a more world-built tone.",
    interesting:
      "The goal was not just polish but atmosphere. The site needed to feel like a space with its own logic.",
    process:
      "I directed the web design and built the frontend architecture, using pacing, layout shifts, and visual depth to create a stronger signature.",
    impact:
      "It stands as a useful example of Gabrielle’s ability to bring a more cinematic or conceptual approach to client work.",
    liveLabel: "Visit live site"
  },
  {
    slug: "oshiozena",
    title: "Oshiozena",
    category: "Client Work",
    year: "2026",
    client: "Oshiozena",
    summary:
      "Fashion-facing digital project combining ecommerce thinking, AI-assisted visuals, and presentation design.",
    role: "Design, development, AI-assisted content production",
    tech: ["Next.js", "Content systems", "AI workflows", "Frontend architecture"],
    previewImage: "/images/previews/oshiozena.png",
    logoImage: "/images/projects/Oshiozenalogo.png",
    siteUrl: "https://www.oshiozena.com/",
    overview:
      "A project exploring how fashion presentation, AI image workflows, and digital commerce can sit inside one visual system.",
    interesting:
      "The tension between product clarity and image atmosphere is what makes it strong.",
    process:
      "This work combines design direction, frontend structure, and AI-assisted visual production.",
    impact:
      "It points directly toward the kind of fashion and future-culture work Gabrielle is well placed to do more of.",
    liveLabel: "Visit live site"
  },
  {
    slug: "gina-corrieri",
    title: "Gina Corrieri",
    category: "Client Work",
    year: "2024",
    client: "Gina Corrieri",
    summary:
      "Performance-led portfolio site with a pared-back visual system and direct presentation.",
    role: "Frontend development, web design",
    tech: ["Next.js", "Tailwind", "Content structure"],
    previewImage: "/images/previews/gina.png",
    preferImagePreview: true,
    siteUrl: "https://ginacorrieri.com/",
    overview:
      "A clean artist-facing web presence focused on directness, legibility, and tone.",
    interesting:
      "The work depended on clarity without losing character.",
    process:
      "I built the frontend and visual presentation around the material itself, keeping the interface minimal and unobtrusive.",
    impact:
      "Useful as part of the broader body of client work showing flexibility across tone and sector.",
    liveLabel: "Visit live site"
  },
  {
    slug: "gomis-trezise",
    title: "Gomis Trezise",
    category: "Client Work",
    year: "2024",
    client: "Gomis Trezise",
    summary:
      "A pared-back portfolio presence with emphasis on structure, image handling, and calm hierarchy.",
    role: "Frontend development, web design",
    tech: ["Next.js", "Tailwind", "Responsive systems"],
    previewImage: "/images/previews/gomis.png",
    siteUrl: "https://gomis-trezise.vercel.app/",
    overview:
      "A minimal presentation system built to foreground work rather than interface decoration.",
    interesting:
      "The strongest move was knowing how little to do and where to keep control.",
    process:
      "I developed the frontend and layout system with an emphasis on restraint, responsiveness, and pacing.",
    impact:
      "It contributes to the case that Gabrielle can deliver clean, exact client work without losing visual intelligence.",
    liveLabel: "Visit live site"
  },
  {
    slug: "tuff-cyan",
    title: "Tuff Cyan",
    category: "Client Work",
    year: "2024",
    client: "Tuff Cyan",
    summary:
      "Minimal portfolio site with a direct visual structure and emphasis on front-end presentation.",
    role: "Frontend development, web design",
    tech: ["Next.js", "Tailwind", "Responsive systems"],
    previewImage: "/images/previews/internetarchitect.png",
    logoImage: "/images/projects/logotuff.png",
    siteUrl: "https://tuff-cyan.vercel.app/",
    overview:
      "A pared-back portfolio build designed to foreground the work with clean structure, pacing, and controlled image handling.",
    interesting:
      "The appeal is in its restraint. The site depends on proportion and presentation rather than decorative effects.",
    process:
      "I shaped the frontend and visual system around a minimal layout language, keeping the interaction direct and the composition tight.",
    impact:
      "It strengthens the client-work side of the portfolio by showing another example of polished, restrained web presentation.",
    liveLabel: "Visit live site"
  }
];

const deferredProjectSlugs = new Set([
  "ancestors-community-sound",
  "morning-bot",
  "gina-corrieri"
]);

const priorityProjectOrder = [
  "henhouse",
  "palazzo-eventi",
  "oshiozena",
  "tasc-fashion-ai",
  "alwa",
  "distant-realities"
];

const priorityIndex = new Map(
  priorityProjectOrder.map((slug, index) => [slug, index])
);

export const projects: Project[] = baseProjects
  .map((project) => ({
    ...project,
    fallbackImage:
      project.slug === "tasc-fashion-ai"
        ? "/images/projects/tasc.png"
        : `/images/projects/${project.slug}.png`
  }))
  .sort((a, b) => {
    const aDeferred = deferredProjectSlugs.has(a.slug);
    const bDeferred = deferredProjectSlugs.has(b.slug);

    if (aDeferred !== bDeferred) {
      return aDeferred ? 1 : -1;
    }

    const aPriority = priorityIndex.get(a.slug);
    const bPriority = priorityIndex.get(b.slug);

    if (aPriority != null && bPriority != null) {
      return aPriority - bPriority;
    }

    if (aPriority != null) return -1;
    if (bPriority != null) return 1;

    return aDeferred ? 1 : -1;
  });

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);

export const capabilities = [
  "Creative development",
  "Interaction design",
  "Immersive storytelling",
  "Frontend craft",
  "Visual systems",
  "Experimental web"
];

export const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "Sanity",
  "WebGL"
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0]
  };
}
