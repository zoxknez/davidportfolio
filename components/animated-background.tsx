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

  if (!isMounted) return <div className="fixed inset-0 -z-50 bg-background" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* Static gradient fallback while video loads */}
      <div 
        className={`absolute inset-0 bg-[linear-gradient(125deg,rgba(239,68,68,0.18),transparent_28%),linear-gradient(35deg,transparent_38%,rgba(69,240,194,0.12)_56%,transparent_74%),linear-gradient(135deg,#07090d_0%,#101610_45%,#090b10_100%)] transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`} 
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_18px)] opacity-20" />
      
      {/* Video - only render when should play */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-52 saturate-[0.9] contrast-[1.14]" : "opacity-0"
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
      
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.94),rgba(5,7,11,0.78)_38%,rgba(5,7,11,0.93)),linear-gradient(180deg,rgba(5,7,11,0.76),rgba(5,7,11,0.5)_36%,rgba(5,7,11,0.96)_88%)] backdrop-blur-[1px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(6,8,12,0.96))]" />
      {/* Noise texture effect using CSS */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

