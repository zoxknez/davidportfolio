"use client";

import { useEffect, useState } from "react";

/**
 * Global video background component with overlay
 */
export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="fixed inset-0 bg-black -z-50" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-gym-weights-close-up-4645/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
    </div>
  );
}

