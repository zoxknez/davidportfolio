"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";

// Demo videos - replace with your own hosted videos in production
// Using publicly accessible sample videos that don't require authentication
const SOURCES = [
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2f276d?q=80&w=1920&auto=format&fit=crop",
  },
] as const;

type BackgroundVideoProps = {
  opacity?: number;
  rotateMs?: number;
};

export function BackgroundVideo({ opacity = 0.6, rotateMs = 8000 }: BackgroundVideoProps) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRotatingRef = useRef(false);
  const failedVideosRef = useRef<Set<number>>(new Set());
  
  const current = useMemo(() => SOURCES[index % SOURCES.length], [index]);

  // Check user preferences
  useEffect(() => {
    const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(prefersReducedMotionQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    prefersReducedMotionQuery.addEventListener("change", handleChange);
    return () => prefersReducedMotionQuery.removeEventListener("change", handleChange);
  }, []);

  // Video rotation - only rotate if video is playing successfully
  useEffect(() => {
    if (prefersReducedMotion || videoError || isRotatingRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    // Only start rotation timer after first video loads successfully
    const startRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (isRotatingRef.current) return; // Prevent overlapping rotations
        
        isRotatingRef.current = true;
        setIndex((i) => {
          let nextIndex = (i + 1) % SOURCES.length;
          // Skip failed videos
          let attempts = 0;
          while (failedVideosRef.current.has(nextIndex) && attempts < SOURCES.length) {
            nextIndex = (nextIndex + 1) % SOURCES.length;
            attempts++;
          }
          isRotatingRef.current = false;
          return nextIndex;
        });
      }, rotateMs);
    };

    // Wait a bit before starting rotation to ensure first video is playing
    const timeout = setTimeout(startRotation, 2000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearTimeout(timeout);
    };
  }, [prefersReducedMotion, videoError, rotateMs]);

  // Handle video errors - mark as failed and try next
  const handleVideoError = () => {
    const currentIndex = index % SOURCES.length;
    failedVideosRef.current.add(currentIndex);
    
    // If all videos failed, show error
    if (failedVideosRef.current.size >= SOURCES.length) {
      setVideoError(true);
      return;
    }
    
    // Try next video after a delay to prevent rapid cycling
    setTimeout(() => {
      if (isRotatingRef.current) return;
      
      isRotatingRef.current = true;
      setIndex((i) => {
        let nextIndex = (i + 1) % SOURCES.length;
        let attempts = 0;
        while (failedVideosRef.current.has(nextIndex) && attempts < SOURCES.length) {
          nextIndex = (nextIndex + 1) % SOURCES.length;
          attempts++;
        }
        isRotatingRef.current = false;
        return nextIndex;
      });
    }, 500);
  };

  // Ensure video plays when loaded
  useEffect(() => {
    if (prefersReducedMotion || videoError) return undefined;
    
    const video = videoRef.current;
    if (!video) return undefined;

    const attemptPlay = async () => {
      try {
        if (video.paused) {
          await video.play();
          // Reset rotation flag when video starts playing
          isRotatingRef.current = false;
        }
      } catch (error) {
        console.error("Error playing video:", error);
        handleVideoError();
      }
    };

    // If video is already loaded, play it
    if (video.readyState >= 3) {
      attemptPlay();
      return undefined;
    }
    
    // Listen for when video can play
    video.addEventListener("canplay", attemptPlay, { once: true });
    video.addEventListener("loadeddata", attemptPlay, { once: true });
    
    return () => {
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("loadeddata", attemptPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, prefersReducedMotion, videoError]);

  // Show poster only if motion is reduced or video failed
  if (prefersReducedMotion || videoError) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0">
          <Image
            src={current?.poster || ""}
            alt=""
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
            unoptimized
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.15))]" />
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-black/50" />
      <video
        ref={videoRef}
        key={current.src}
        className="h-full w-full object-cover transition-opacity duration-700"
        autoPlay
        muted
        loop
        playsInline
        poster={current.poster}
        preload="auto"
        onError={handleVideoError}
        onLoadedData={(e) => {
          const video = e.currentTarget;
          if (video.paused) {
            video.play().catch(() => handleVideoError());
          }
        }}
        style={{ opacity }}
      >
        <source src={current.src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.15))]" />
    </div>
  );
}
