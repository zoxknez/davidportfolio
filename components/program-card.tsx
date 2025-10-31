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
      className="group relative overflow-hidden rounded-2xl glass-card glass-card-hover animate-fade-in"
    >
      <div className="relative aspect-[16/9] w-full">
        {media.map((m, i) => (
          <div
            key={`${m.kind}-${i}`}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            {m.kind === "video" ? (
              <video className="h-full w-full object-cover" muted playsInline loop autoPlay poster={m.poster}>
                <source src={m.src} type="video/mp4" />
              </video>
            ) : (
              <Image 
                src={m.src} 
                alt={`${program.title} - ${program.goal}`} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            )}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-semibold text-white">{program.title}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-white/80">{program.goal}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 text-xs">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
          {program.level}
        </span>
        <span className="text-white/70">
          {program.weeks} w • {program.daysPerWeek} d/w
        </span>
      </div>
    </Link>
  );
}

export const ProgramCard = memo(ProgramCardComponent);
ProgramCard.displayName = "ProgramCard";


