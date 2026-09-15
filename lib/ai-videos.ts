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
    id: "ai-extreme-close-up",
    title: "extreme_close_up_candid_documentary_footage__partial_face_only__woman_casually_smoking_a_cigarette__",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1Cdfq0HS6bvCqqEx56u8TguB2cKriWQVe/view?usp=sharing"
  },
  {
    id: "ai-hf-20260422-015203",
    title: "hf_20260422_015203_b5db7f3d-582f-4fba-be08-e56ed6281270 (1)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1o9W00vjzEu6l3N1rDEL-hA3vt0qqGtws/view?usp=sharing"
  },
  {
    id: "ai-hf-20260422-022425-2",
    title: "hf_20260422_022425_dc228b49-3124-47f7-8526-fe30ee4660c7 (2)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/19Ogiim8IZEAqv7YNuFnsTBPnE8yjJQhI/view?usp=sharing"
  },
  {
    id: "ai-hf-20260422-022425-3",
    title: "hf_20260422_022425_dc228b49-3124-47f7-8526-fe30ee4660c7 (3)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1ednVCLtp9gT8qqFvfW1i2yvLgkuJPFJl/view?usp=sharing"
  },
  {
    id: "ai-hf-20260422-022503",
    title: "hf_20260422_022503_da923673-a53a-4c49-adf9-6f2ce3ac57c5 (2)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1LPW8leVJ3ic0WBbK8sLtiww2Qhv0GM4Q/view?usp=sharing"
  },
  {
    id: "ai-hf-20260426-001222",
    title: "hf_20260426_001222_dfb4bd6f-0827-4491-869f-0140b07e63f7 (2)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1SShtSgacsdOLJhNhnzBPJjcDlj3ozkGK/view?usp=sharing"
  },
  {
    id: "ai-hf-20260429-021508",
    title: "hf_20260429_021508_33e8098b-fe47-49ca-afd4-8273e603cf7e",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1XvM-u1MjSUa3Xe5KhA5edxHRvU7aaZ1G/view?usp=sharing"
  },
  {
    id: "ai-hf-20260429-022508",
    title: "hf_20260429_022508_10868d11-9491-4382-a48a-b4ba31d72254",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1e-2ALgEoAfURd9KzkAn9ns4cnrWi1jwQ/view?usp=sharing"
  },
  {
    id: "ai-hf-20260429-023057",
    title: "hf_20260429_023057_c2d3ca6c-6f75-4f2e-b04d-56084601006c",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1ZOH7n1FgRRYC7c706BEPEdD2GdWc7E0W/view?usp=sharing"
  },
  {
    id: "ai-hf-20260429-023557",
    title: "hf_20260429_023557_43c7edd7-518a-443e-9a3a-53b101feea1f",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1zFawjopZ8m6LhOyxtr-pS0-rain_4qDD/view?usp=sharing"
  },
  {
    id: "ai-hf-20260429-023738",
    title: "hf_20260429_023738_ff67989b-efc6-4576-bfb2-e49e4453d27c",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1jtXTVydPD4FUkETLpFjBAH8k0cySW37G/view?usp=sharing"
  },
  {
    id: "ai-hf-20260513-021546",
    title: "hf_20260513_021546_8d18aa0f-aabc-41bd-ac5e-0496f75e0392",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1a5E5l8EMyLVGYBIekAvCkNyGCn6SdgCa/view?usp=sharing"
  },
  {
    id: "ai-hgjbj",
    title: "hgjbj_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1xOIh9ET3RKN6PNXu66xtm-pRXyGlOPPk/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152229",
    title: "WhatsApp Video 2026-03-16 at 15.22.29",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1dcFXzvvxblLUek_eLmaByabUUGOg03UM/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152230-1",
    title: "WhatsApp Video 2026-03-16 at 15.22.30_1",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1q6PHI9nj-g5RM1dGSXpmNj1JExVENuQs/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152230",
    title: "WhatsApp Video 2026-03-16 at 15.22.30",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1wmsp_1kIc5ZmXufFOjYGb7Qmuk9RKL4m/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152231",
    title: "WhatsApp Video 2026-03-16 at 15.22.31",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1IYTslu650Bm-T6gd3N293i7Oz26kLB3e/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152233",
    title: "WhatsApp Video 2026-03-16 at 15.22.33",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1K5fTkGsk4buSp_AeRYJxhma5s9hifPEA/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152234",
    title: "WhatsApp Video 2026-03-16 at 15.22.34",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1pa7jFur21xwfklfxzSOkAnuyOXDWI_lb/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260316-152237",
    title: "WhatsApp Video 2026-03-16 at 15.22.37",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1pr1ExMvD7yGNRqqmazqi8R7hibbQH_ZI/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150757",
    title: "whatsapp_video_2026-04-16_at_15.07.57_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1EI2EdXTwGOE1oV2bSjqZV__Qv6XPGbsj/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150758",
    title: "whatsapp_video_2026-04-16_at_15.07.58_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1YdlPl7DagJKETgYp_oVuAiqDvhs8OsHo/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150759",
    title: "whatsapp_video_2026-04-16_at_15.07.59_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/13qy5PWGHTHRn9DYkbcoyGt9dxU1wpiOo/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150800",
    title: "whatsapp_video_2026-04-16_at_15.08.00_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1ufAu05wJ5pSyMJutJfFU7gE56B6ldktk/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150802",
    title: "whatsapp_video_2026-04-16_at_15.08.02_v1 (540p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1EJCJTL_7NGjMNv7BVWnr-rqlRY7YM1_u/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150806",
    title: "whatsapp_video_2026-04-16_at_15.08.06_v1 (720p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/13q9orDaMlzZGrI4ncY-SGuAjg6RvIZph/view?usp=sharing"
  },
  {
    id: "ai-whatsapp-20260416-150808",
    title: "whatsapp_video_2026-04-16_at_15.08.08_v1 (720p)",
    location: "Unknown Location",
    videoUrl: "https://drive.google.com/file/d/1SEgA8wc-FU441Llke44QBBsTiK_ixIAm/view?usp=sharing"
  }
];

export const aiVideos: AiVideo[] = aiVideoSources.map((video) => ({
  ...video,
  projectType: "Artificial Intelligence",
  embedUrl: toVideoEmbedUrl(video.videoUrl)
}));
