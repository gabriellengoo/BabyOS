import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteShell } from "@/components/sections/site-shell";

import "./globals.css";

const univers = localFont({
  src: "../public/fonts/UniversNextPro-Regular.woff2",
  variable: "--font-univers"
});

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
    apple: "/favicon.ico"
  },
  openGraph: {
    title: "babyOS is typeing..",
    description: "Minimal portfolio for Gabrielle Ngoo, creative developer and creative technologist.",
    url: "https://internetarchitect.online",
    siteName: "babyOS",
    images: [
      {
        url: "/public/images/site/logo.png",
        width: 800,
        height: 600,
        alt: "babyOS Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "babyOS is typeing..",
    description: "Minimal portfolio for Gabrielle Ngoo, creative developer and creative technologist.",
    images: ["/public/images/site/logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${univers.variable} ${testSohneFett.variable} ${testSohneBuch.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
