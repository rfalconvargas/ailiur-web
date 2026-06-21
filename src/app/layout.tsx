import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/ui/site-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { Providers } from "@/components/providers";

// Editorial serif for titles/display.
const editorial = localFont({
  src: [
    { path: "../fonts/PPEditorialNew-Ultralight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PPEditorialNew-Ultrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Rounded sans for body + UI.
const rounded = localFont({
  src: "../fonts/SFProRounded.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ailiur.com"),
  title: {
    default: "Ailiur",
    template: "%s · Ailiur",
  },
  description:
    "Ailiur builds AI-first outcome engines for learning, health, creativity, personal intelligence, and work — connected by one private Context Mesh so progress in one compounds across all.",
  applicationName: "Ailiur",
  keywords: [
    "Ailiur",
    "AI outcome engines",
    "Unified Context Mesh",
    "Qetos",
    "Enchiridion",
    "Oruvo",
    "Tayzt",
    "Tellumetry",
    "local-first AI",
    "personal AI operating system",
  ],
  authors: [{ name: "Ailiur" }],
  creator: "Ailiur",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.ailiur.com",
    siteName: "Ailiur",
    locale: "en_US",
    title: "Ailiur — AI-first outcome engines for a better human life",
    description:
      "AI-first apps for learning, health, creativity, personal intelligence, and work — connected by one private Context Mesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailiur — AI-first outcome engines for a better human life",
    description:
      "AI-first apps for learning, health, creativity, personal intelligence, and work — connected by one private Context Mesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${rounded.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <SiteNav />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
