import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { clientEnv } from "@/lib/env";
import { reportWebVitals } from "@/lib/web-vitals";
import { Toaster } from "sonner";

// Export reportWebVitals for Next.js to use
export { reportWebVitals };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent invisible text during font load
  preload: true, // Prioritize loading this font
  fallback: ["system-ui", "arial"], // Fallback fonts
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Prevent invisible text during font load
  preload: false, // Lower priority - not critical for initial render
  fallback: ["Courier New", "monospace"], // Fallback fonts
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "David Knežević — Fitness Coach",
    template: "%s | David Knežević",
  },
  description: "Elite coaching, programs, videos, and personalized training plans. Transform your fitness journey with expert guidance.",
  keywords: ["fitness coach", "personal training", "workout programs", "strength training", "fitness coaching", "David Knežević"],
  authors: [{ name: "David Knežević" }],
  creator: "David Knežević",
  publisher: "David Knežević",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "David Knežević — Fitness Coach",
    title: "David Knežević — Fitness Coach",
    description: "Elite coaching, programs, videos, and personalized training plans.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David Knežević — Fitness Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Knežević — Fitness Coach",
    description: "Elite coaching, programs, videos, and personalized training plans.",
    images: ["/og-image.jpg"],
    creator: "@davidfitness",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "/",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          Skip to main content
        </a>
        
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        
        <Toaster 
          position="top-right"
          richColors
          closeButton
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.9)",
            },
          }}
        />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
