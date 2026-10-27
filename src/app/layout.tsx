import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { profile } from "@/content/profile";
import "./globals.css";
export const metadata: Metadata = {
  ...(profile.siteUrl ? { metadataBase: new URL(profile.siteUrl) } : {}),
  title: {
    default: "WORLDSMITH — Gameplay engineering & interactive systems",
    template: "%s — WORLDSMITH",
  },
  description:
    "An engineering field journal. Explore character traversal, multiplayer authority, branching quests and original interactive storytelling studies.",
  keywords: [
    "Gameplay Engineering",
    "Unreal Engine",
    "C++",
    "Unity",
    "Game AI",
    "Gameplay Architecture",
    "Interactive Storytelling",
  ],
  openGraph: {
    type: "website",
    title: "WORLDSMITH",
    description: "Engineering worlds worth exploring.",
    ...(profile.siteUrl
      ? {
          images: [
            {
              url: "/social-preview",
              width: 1200,
              height: 630,
              alt: "WORLDSMITH — Engineering worlds worth exploring.",
            },
          ],
        }
      : {}),
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
