"use client";

import Image from "next/image";
import { type Program } from "@/data/programs";
import { useEffect, useMemo, useState } from "react";

type Media = { kind: "image"; src: string } | { kind: "video"; src: string; poster?: string };

export function ProgramCard({ program }: { program: Program }) {
  const media: Media[] = useMemo(() => {
    const arr: Media[] = [];
    if (program.image) arr.push({ kind: "image", src: program.image });
    if (program.gallery?.length) arr.push(...program.gallery.map((g) => ({ kind: "image", src: g }) as Media));
    if (program.trailer) arr.push({ kind: "video", src: program.trailer, poster: program.image });
    return arr.length ? arr : [{ kind: "image", src: "/vercel.svg" }];
  }, [program.image, program.gallery, program.trailer]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 2000);
    return () => clearInterval(id);
  }, [media.length]);

  return (
    <a
      href={`/programs/${program.slug}`}
      className="group relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur transition hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/70"
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
              <Image src={m.src} alt={program.title} fill className="object-cover" />
            )}
          </div>
        ))}
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


