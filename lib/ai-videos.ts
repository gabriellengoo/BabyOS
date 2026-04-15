export type AiVideo = {
  id: string;
  title: string;
  location: string;
  projectType: string;
  vimeoUrl: string;
  embedUrl: string;
};

const aiVideoLinks = [
  "https://vimeo.com/1182100208?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100252?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100278?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100293?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100304?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100315?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100323?share=copy&fl=sv&fe=ci",
  "https://vimeo.com/1182100337?share=copy&fl=sv&fe=ci"
];

const aiVideoLocations = [
  "London, Prince Regent Lane E13",
  "Seoul, Eulji-ro 178",
  "Paris, Rue des Martyrs 41",
  "Tokyo, Aoyama-dori 6-12",
  "Berlin, Kottbusser Damm 87",
  "New York, Orchard Street 55",
  "Accra, Oxford Street 29",
  "Hong Kong, Des Voeux Road 318"
];

export function toVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  const id = match?.[1] ?? "";
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&title=0&byline=0&portrait=0`;
}

export const aiVideos: AiVideo[] = aiVideoLinks.map((vimeoUrl, index) => ({
  id: `ai-${String(index + 1).padStart(3, "0")}`,
  title: `AI ${String(index + 1).padStart(3, "0")}`,
  location: aiVideoLocations[index] ?? "Unknown Location",
  projectType: "Artificial Intelligence",
  vimeoUrl,
  embedUrl: toVimeoEmbedUrl(vimeoUrl)
}));
