import { toVideoEmbedUrl } from "@/lib/video-embed";

export type AiVideo = {
  id: string;
  title: string;
  location: string;
  projectType: string;
  videoUrl: string;
  embedUrl: string;
};

type AiVideoSource = {
  id: string;
  title: string;
  location: string;
  videoUrl: string;
};

const aiVideoSources: AiVideoSource[] = [
  {
    id: "ai-001",
    title: "AI 001",
    location: "New York, Orchard Street 55",
    videoUrl: "https://player.mediadelivery.net/play/659920/3e6f8355-561d-487f-a53e-0ab5e4792429"
  },
  {
    id: "ai-002",
    title: "AI 002",
    location: "Seoul, Eulji-ro 178",
    videoUrl: "https://player.mediadelivery.net/play/659920/1fadfde2-8b66-4b0c-bc75-693d36245efb"
  },
  {
    id: "ai-003",
    title: "AI 003",
    location: "Paris, Rue des Martyrs 41",
    videoUrl: "https://player.mediadelivery.net/play/659920/83cb167b-95fd-47eb-b2dd-0204a9a760f6"
  },
  {
    id: "ai-004",
    title: "AI 004",
    location: "Tokyo, Aoyama-dori 6-12",
    videoUrl: "https://player.mediadelivery.net/play/659920/8e2c9fdd-b52b-44db-8739-30042eab2c33"
  },
  {
    id: "ai-005",
    title: "AI 005",
    location: "Berlin, Kottbusser Damm 87",
    videoUrl: "https://player.mediadelivery.net/play/659920/e85edf75-bc9d-4071-a45c-1cab351fc20a"
  },
  {
    id: "ai-006",
    title: "AI 006",
    location: "London, Prince Regent Lane E13",
    videoUrl: "https://player.mediadelivery.net/play/659920/18762300-ada1-4ad9-b8e6-ab5a7b93dcc7"
  },
  {
    id: "ai-007",
    title: "AI 007",
    location: "Hong Kong, Des Voeux Road 318",
    videoUrl: "https://player.mediadelivery.net/play/659920/6c4c0f95-2849-4fad-9d21-4aa3d088c47e"
  },
  {
    id: "ai-008",
    title: "AI 008",
    location: "Unknown Location",
    videoUrl: "https://player.mediadelivery.net/play/659920/8dbaf01d-aa07-4bac-a7d2-ea310912548f"
  },
  {
    id: "ai-009",
    title: "AI 009",
    location: "Unknown Location",
    videoUrl: "https://player.mediadelivery.net/play/659920/4045c711-ccc2-4d04-b4dc-ff983262acde"
  }
];

export const aiVideos: AiVideo[] = aiVideoSources.map((video) => ({
  ...video,
  projectType: "Artificial Intelligence",
  embedUrl: toVideoEmbedUrl(video.videoUrl)
}));
