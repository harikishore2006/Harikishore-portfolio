import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Harikishore K | AI & Data Science Developer",
  description:
    "Portfolio of Harikishore K, an Artificial Intelligence and Data Science developer building AI-powered applications and modern web experiences.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Harikishore K | AI & Data Science Developer",
    description:
      "Portfolio of Harikishore K, an Artificial Intelligence and Data Science developer building AI-powered applications and modern web experiences.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Harikishore K | AI & Data Science Developer",
    description:
      "Portfolio of Harikishore K, an Artificial Intelligence and Data Science developer building AI-powered applications and modern web experiences.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#111110] text-[#f3f3f0]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-[#171715] focus:bg-[#e7a847] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#171715]"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.fullName,
              jobTitle: siteConfig.role,
              email: `mailto:${siteConfig.email}`,
              url: siteUrl,
              sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.leetcode],
            }),
          }}
        />
      </body>
    </html>
  );
}
