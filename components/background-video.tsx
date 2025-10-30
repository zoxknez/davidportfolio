"use client";

import { useEffect, useMemo, useState } from "react";

const SOURCES = [
  {
    src: "https://cdn.coverr.co/videos/coverr-athletes-exercising-3265/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop",
  },
  {
    src: "https://cdn.coverr.co/videos/coverr-running-at-the-stadium-9164/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1920&auto=format&fit=crop",
  },
  {
    src: "https://cdn.coverr.co/videos/coverr-girl-exercising-in-the-living-room-5396/1080p.mp4",
    poster:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1920&auto=format&fit=crop",
  },
];

type BackgroundVideoProps = {
  opacity?: number; // 0..1
  rotateMs?: number;
};

export function BackgroundVideo({ opacity = 0.6, rotateMs = 12000 }: BackgroundVideoProps) {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => SOURCES[index % SOURCES.length], [index]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SOURCES.length), rotateMs);
    return () => clearInterval(id);
  }, [rotateMs]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      <video
        key={current.src}
        className="h-full w-full object-cover transition-opacity duration-700"
        autoPlay
        muted
        loop
        playsInline
        poster={current.poster}
        aria-hidden
        style={{ opacity }}
      >
        <source src={current.src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.15))]" />
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
        }
      `}</style>
    </div>
  );
}


