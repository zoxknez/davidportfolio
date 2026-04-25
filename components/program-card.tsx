"use client";

import Image from "next/image";
import Link from "next/link";
import { type Program } from "@/data/programs";
import { memo, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { createProgramMedia, type Media } from "@/lib/program-media";
import { motion, AnimatePresence } from "framer-motion";

function ProgramCardComponent({ program }: { program: Program }) {
  const media: Media[] = useMemo(() => createProgramMedia(program, true), [program]);
  const accents = ["oklch(0.66 0.22 31)", "oklch(0.79 0.16 170)", "oklch(0.86 0.18 112)"] as const;
  const accent = accents[program.slug.length % accents.length] ?? accents[0];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (media.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 2000);
    return () => clearInterval(id);
  }, [media.length]);

  const currentMedia = media[idx];

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="block h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ y: -8 }}
        className="glass-card group relative h-full overflow-hidden transition-all duration-500"
        style={{ "--glass-accent": accent } as CSSProperties}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {currentMedia && (
              <motion.div
                key={`${currentMedia.kind}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {currentMedia.kind === "video" ? (
                  <video 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    muted 
                    playsInline 
                    loop 
                    autoPlay 
                    poster={currentMedia.poster}
                  >
                    <source src={currentMedia.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image 
                    src={currentMedia.src} 
                    alt={`${program.title} - ${program.goal}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Enhanced gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/40" />
          
          {/* Animated shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out" />
          </div>
          
          {/* Accent glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.79_0.16_170_/_0.15)] to-transparent" />
          </div>
          
          <div className="absolute inset-x-0 bottom-0 p-6 z-10">
            <h3 className="mb-2 text-xl font-black text-white transition-all duration-300 group-hover:text-[oklch(0.86_0.18_112)] group-hover:translate-x-1">
              {program.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-white/85 transition-all duration-300 group-hover:text-white/95">
              {program.goal}
            </p>
          </div>
        </div>
        
        <div className="relative flex items-center justify-between border-t border-white/12 bg-gradient-to-br from-white/[0.09] to-transparent p-5 text-xs transition-all duration-300 group-hover:border-white/25 group-hover:from-white/[0.12]">
          <span className="rounded-lg border border-white/25 bg-white/[0.12] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white/95 backdrop-blur-sm transition-all duration-300 group-hover:border-white/35 group-hover:bg-white/[0.22] group-hover:shadow-lg group-hover:scale-105">
            {program.level}
          </span>
          <span className="font-semibold text-white/75 transition-all duration-300 group-hover:text-white/95 group-hover:translate-x-1">
            {program.weeks} w • {program.daysPerWeek} d/w
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export const ProgramCard = memo(ProgramCardComponent);
ProgramCard.displayName = "ProgramCard";


