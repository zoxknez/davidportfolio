"use client";

import Image from "next/image";
import Link from "next/link";
import { type Program } from "@/data/programs";
import { memo, useEffect, useMemo, useState } from "react";
import { createProgramMedia, type Media } from "@/lib/program-media";

function ProgramCardComponent({ program }: { program: Program }) {
  const media: Media[] = useMemo(() => createProgramMedia(program, true), [program]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 2000);
    return () => clearInterval(id);
  }, [media.length]);

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative h-full overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2 animate-fade-in"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
      
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {media.map((m, i) => (
          <div
            key={`${m.kind}-${i}`}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            {m.kind === "video" ? (
              <video 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                muted 
                playsInline 
                loop 
                autoPlay 
                poster={m.poster}
              >
                <source src={m.src} type="video/mp4" />
              </video>
            ) : (
              <Image 
                src={m.src} 
                alt={`${program.title} - ${program.goal}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            )}
          </div>
        ))}
        
        {/* Enhanced gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
        
        {/* Animated shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-5 transform transition-all duration-300 group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-white mb-1 transition-all duration-300 group-hover:text-xl">
            {program.title}
          </h3>
          <p className="line-clamp-2 text-sm text-white/80 transition-all duration-300 group-hover:text-white/90">
            {program.goal}
          </p>
        </div>
      </div>
      
      <div className="relative flex items-center justify-between p-5 text-xs border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20 group-hover:scale-105">
          {program.level}
        </span>
        <span className="text-white/70 transition-colors duration-300 group-hover:text-white/90">
          {program.weeks} w • {program.daysPerWeek} d/w
        </span>
      </div>
    </Link>
  );
}

export const ProgramCard = memo(ProgramCardComponent);
ProgramCard.displayName = "ProgramCard";


