"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ImageIcon, Sparkles, Film, Camera, X } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaPage() {
  const mounted = useMounted();
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; src: string; title: string } | null>(null);

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

  if (!mounted) return null;

  return (
    <>
      <div className="min-h-dvh font-sans text-white relative overflow-hidden">
        <AnimatedBackground />

        <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
          <BackButton />

          {/* Header */}
          <div className="mt-12 sm:mt-16 md:mt-20 mb-12 pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
                <Sparkles className="h-4 w-4 text-white/80" />
                <span className="text-xs sm:text-sm font-medium text-white/90">
                  Training Content & Demonstrations
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                    Media Gallery
                  </h1>
                  <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                    Browse through training videos, workout photos, and movement demonstrations. 
                    Click any item to view in full screen.
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
                    <Film className="h-5 w-5 text-white/70 mx-auto mb-1" />
                    <div className="text-xs text-white/60">
                      {mediaItems.filter(i => i.type === "video").length} videos
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
                    <Camera className="h-5 w-5 text-white/70 mx-auto mb-1" />
                    <div className="text-xs text-white/60">
                      {mediaItems.filter(i => i.type === "image").length} photos
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Media Grid with Scroll Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-12">
            {mediaItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                <button
                  onClick={() => setSelectedMedia(item)}
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                  
                  {item.type === "video" ? (
                    <video
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  )}
                  
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                  
                  {/* Play/View icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 border border-white/30 transition-transform duration-300 group-hover:scale-110">
                      {item.type === "video" ? (
                        <Play className="h-8 w-8 text-white" fill="currentColor" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-5 transform transition-all duration-300">
                    <p className="text-sm font-semibold text-white transition-all duration-300 group-hover:text-base">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white/70 px-2 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                        {item.type === "video" ? "Video" : "Photo"}
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
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
                className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm p-2 text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <p className="text-lg font-semibold text-white">{selectedMedia.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
