import { SiteFooter, SiteHeader, WhatsAppSticky } from "@/components/Site";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "600",
});

const text = Source_Sans_3({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Opralvin One — book a free process audit",
  description:
    "One system for the books, stock, and GST paperwork a growing Indian firm already does. The first meeting is a free process audit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppSticky />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.includes("{{") ? (
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
        ) : null}
      </body>
    </html>
  );
}
