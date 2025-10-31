import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fitness Coach",
    short_name: "Coach",
    description: "Fitness coach portfolio with programs, videos, and personalized plans.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}


