import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Analytics } from "@vercel/analytics/next";

import { SiteShell } from "@/components/sections/site-shell";

import "./globals.css";

const testSohneFett = localFont({
  src: "../public/fonts/TestSohne-Fett.otf",
  variable: "--font-test-sohne-fett"
});

const testSohneBuch = localFont({
  src: "../public/fonts/TestSohne-Buch.otf",
  variable: "--font-test-sohne-buch"
});

export const metadata: Metadata = {
  title: "babyOS is typeing..",
  description:
    "Minimal portfolio for Gabrielle Ngoo, creative developer and creative technologist.",
  metadataBase: new URL("https://internetarchitect.online"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" }
    ],
    other: [
      { url: "/android-icon-36x36.png", sizes: "36x36" },
      { url: "/android-icon-48x48.png", sizes: "48x48" },
      { url: "/android-icon-72x72.png", sizes: "72x72" },
      { url: "/android-icon-96x96.png", sizes: "96x96" },
      { url: "/android-icon-144x144.png", sizes: "144x144" },
      { url: "/android-icon-192x192.png", sizes: "192x192" },
      { url: "/ms-icon-70x70.png", sizes: "70x70" },
      { url: "/ms-icon-150x150.png", sizes: "150x150" },
      { url: "/ms-icon-310x310.png", sizes: "310x310" }
    ]
  },
  openGraph: {
    title: "babyOS is typeing..",
    description: "Minimal portfolio for Gabrielle Ngoo, creative developer and creative technologist.",
    url: "https://internetarchitect.online",
    siteName: "babyOS",
    images: [
      {
        url: "/public/images/previews/internetarchitect.png",
        width: 1200,
        height: 630,
        alt: "Preview of babyOS portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "babyOS is typeing..",
    description: "Minimal portfolio for Gabrielle Ngoo, creative developer and creative technologist.",
    images: ["/public/images/previews/internetarchitect.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${testSohneFett.variable} ${testSohneBuch.variable}`} style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <body>
        <SiteShell>{children}</SiteShell>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
