export type AiVideo = {
  id: string;
  title: string;
  location: string;
  projectType: string;
  vimeoUrl: string;
  embedUrl: string;
};

type AiVideoSource = {
  id: string;
  title: string;
  location: string;
  vimeoUrl: string;
};

const aiVideoSources: AiVideoSource[] = [
  {
    id: "ai-006",
    title: "AI 006",
    location: "New York, Orchard Street 55",
    vimeoUrl: "https://vimeo.com/1182100361?fl=ip&fe=ec"
  },
  {
    id: "ai-002",
    title: "AI 002",
    location: "Seoul, Eulji-ro 178",
    vimeoUrl: "https://vimeo.com/1182100252?share=copy&fl=sv&fe=ci"
  },
  {
    id: "ai-003",
    title: "AI 003",
    location: "Paris, Rue des Martyrs 41",
    vimeoUrl: "https://vimeo.com/1182100278?share=copy&fl=sv&fe=ci"
  },
  {
    id: "ai-004",
    title: "AI 004",
    location: "Tokyo, Aoyama-dori 6-12",
    vimeoUrl: "https://vimeo.com/1182100293?share=copy&fl=sv&fe=ci"
  },
  {
    id: "ai-005",
    title: "AI 005",
    location: "Berlin, Kottbusser Damm 87",
    vimeoUrl: "https://vimeo.com/1183757406"
  },
  {
    id: "ai-001",
    title: "AI 001",
    location: "London, Prince Regent Lane E13",
    vimeoUrl: "https://vimeo.com/1183757367"
  },
  {
    id: "ai-008",
    title: "AI 008",
    location: "Hong Kong, Des Voeux Road 318",
    vimeoUrl: "https://vimeo.com/1183757401"
  },
  {
    id: "ai-009",
    title: "AI 009",
    location: "Unknown Location",
    vimeoUrl: "https://vimeo.com/1183757407"
  },
  {
    id: "ai-010",
    title: "AI 010",
    location: "Unknown Location",
    vimeoUrl: "https://vimeo.com/1183757369"
  },
  {
    id: "ai-011",
    title: "AI 011",
    location: "Unknown Location",
    vimeoUrl: "https://vimeo.com/1183757370"
  },
  {
    id: "ai-012",
    title: "AI 012",
    location: "Unknown Location",
    vimeoUrl: "https://vimeo.com/1183757366"
  }
];

export function toVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  const id = match?.[1] ?? "";
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&title=0&byline=0&portrait=0`;
}

export const aiVideos: AiVideo[] = aiVideoSources.map((video) => ({
  ...video,
  projectType: "Artificial Intelligence",
  embedUrl: toVimeoEmbedUrl(video.vimeoUrl)
}));
