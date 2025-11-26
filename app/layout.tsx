import type { Metadata, Viewport } from "next";
import "./globals.css";
import { clientEnv } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "David Knežević — Fitness Coach",
    template: "%s | David Knežević",
  },
  description: "Elite coaching, programs, videos, and personalized training plans. Transform your fitness journey with expert guidance.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Root layout - just provides the basic HTML structure
// The actual content is rendered in [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
