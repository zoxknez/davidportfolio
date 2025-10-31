"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, ImageIcon } from "lucide-react";

export default function MediaPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; src: string; title: string } | null>(null);
  useEffect(() => setMounted(true), []);

  const mediaItems = [
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
      title: "Functional Training",
    },
    {
      type: "video" as const,
      src: "https://cdn.coverr.co/videos/coverr-athletes-exercising-3265/1080p.mp4",
      title: "Athletes Exercising",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1600&auto=format&fit=crop",
      title: "Strength Training",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=1600&auto=format&fit=crop",
      title: "Conditioning",
    },
    {
      type: "video" as const,
      src: "https://cdn.coverr.co/videos/coverr-running-at-the-stadium-9164/1080p.mp4",
      title: "Stadium Running",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600&auto=format&fit=crop",
      title: "Performance Training",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
      title: "Athletic Movement",
    },
    {
      type: "video" as const,
      src: "https://cdn.coverr.co/videos/coverr-girl-exercising-in-the-living-room-5396/1080p.mp4",
      title: "Home Workout",
    },
    {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop",
      title: "Women's Training",
    },
  ];

  return (
    <>
      <div className="min-h-dvh font-sans text-white relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="fixed inset-0 animated-gradient" />
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        
        {/* Animated Glow Orbs */}
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

        <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <Button 
              variant="ghost" 
              className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
              asChild
            >
              <a href="/">← Home</a>
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 pt-0">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
              Media
            </h1>
            <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              Training videos, workout photos, and movement demonstrations.
            </p>
          </div>

          {/* Media Grid */}
          <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            {mediaItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMedia(item)}
                className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
              >
                {item.type === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.type === "video" ? (
                    <Play className="h-12 w-12 text-white/90" fill="currentColor" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-white/90" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "video" ? (
              <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                src={selectedMedia.src}
              >
                <source src={selectedMedia.src} type="video/mp4" />
              </video>
            ) : (
              <Image src={selectedMedia.src} alt={selectedMedia.title} fill className="object-contain" />
            )}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm p-2 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-lg font-semibold text-white">{selectedMedia.title}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

