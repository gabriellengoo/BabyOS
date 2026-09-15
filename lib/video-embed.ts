function getGoogleDriveFileId(url: string) {
  const filePathMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  if (filePathMatch?.[1]) {
    return filePathMatch[1];
  }

  const queryMatch = url.match(/[?&]id=([^&#]+)/);
  if (url.includes("drive.google.com") && queryMatch?.[1]) {
    return queryMatch[1];
  }

  return "";
}

export function toVideoEmbedUrl(url: string) {
  const driveFileId = getGoogleDriveFileId(url);

  if (!driveFileId) {
    return "";
  }

  const embedUrl = new URL("https://drive.google.com/uc");
  embedUrl.searchParams.set("export", "download");
  embedUrl.searchParams.set("id", driveFileId);

  return embedUrl.toString();
}
