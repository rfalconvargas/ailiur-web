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
  title: "Ailiur",
  description:
    "Ailiur is the operating system for human flourishing. Qetos and Enchiridion, unified locally by the Context Mesh.",
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
