"use client";

import Image from "next/image";
import { type Program } from "@/data/programs";
import { useState } from "react";

export function ProgramCard({ program }: { program: Program }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/programs/${program.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur transition hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/70"
    >
      <div className="relative aspect-[16/9] w-full">
        {program.trailer ? (
          <video
            className="h-full w-full object-cover transition-opacity duration-300"
            muted
            playsInline
            loop
            autoPlay={hovered}
            poster={program.image}
            style={{ opacity: hovered ? 1 : 0.9 }}
          >
            <source src={program.trailer} type="video/mp4" />
          </video>
        ) : (
          <Image src={program.image} alt={program.title} fill className="object-cover" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-semibold text-white">{program.title}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-white/80">{program.goal}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 text-xs text-zinc-600 dark:text-zinc-400">
        <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] uppercase tracking-wide dark:bg-zinc-800">
          {program.level}
        </span>
        <span>
          {program.weeks} w • {program.daysPerWeek} d/w
        </span>
      </div>
    </a>
  );
}


