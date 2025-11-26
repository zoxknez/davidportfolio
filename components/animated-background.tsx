"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Global video background component with overlay
 * Optimized with lazy loading and reduced motion support
 */
export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setShouldPlayVideo(false);
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldPlayVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Observe the document body (video should load when page is visible)
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video autoplay failed (browser restriction)
        console.log("Video autoplay prevented by browser");
      });
    }
  }, [shouldPlayVideo]);

  if (!isMounted) return <div className="fixed inset-0 bg-black -z-50" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
      {/* Static gradient fallback while video loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`} 
      />
      
      {/* Video - only render when should play */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-40" : "opacity-0"
          }`}
        >
          {/* Lower quality for mobile, higher for desktop */}
          <source
            src="https://cdn.coverr.co/videos/coverr-gym-weights-close-up-4645/1080p.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src="https://cdn.coverr.co/videos/coverr-gym-weights-close-up-4645/preview/coverr-gym-weights-close-up-4645.webm"
            type="video/webm"
          />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
    </div>
  );
}

