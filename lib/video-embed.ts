const BUNNY_PREVIEW_PARAMS = {
  autoplay: "true",
  muted: "true",
  loop: "true",
  playsinline: "true",
  preload: "true",
  responsive: "true",
  rememberPosition: "false",
  showSpeed: "false",
  showHeatmap: "false",
  chromecast: "false",
  disableAirplay: "true",
  disableIosPlayer: "true",
  compactControls: "true",
  controls: "false"
};

export function toVideoEmbedUrl(url: string) {
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  const vimeoId = vimeoMatch?.[1] ?? "";

  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&title=0&byline=0&portrait=0`;
  }

  const bunnyMatch = url.match(
    /player\.mediadelivery\.net\/(?:play|embed)\/([^/?#]+)\/([^/?#]+)/
  );

  if (bunnyMatch) {
    const [, libraryId, videoId] = bunnyMatch;
    const embedUrl = new URL(
      `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`
    );

    Object.entries(BUNNY_PREVIEW_PARAMS).forEach(([key, value]) => {
      embedUrl.searchParams.set(key, value);
    });

    return embedUrl.toString();
  }

  return url;
}
