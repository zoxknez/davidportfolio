"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { createProgramMedia, type Media } from "@/lib/program-media";
import { useMounted } from "@/hooks/use-mounted";
import { BackButton } from "@/components/back-button";

export default function ProgramDetailClient({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const purchased = searchParams.get("purchased") === "true";
  
  const params = use(paramsPromise);
  const program = getProgram(params.slug);
  if (!program) return notFound();

  const media: Media[] = useMemo(() => createProgramMedia(program, false), [program]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (media.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 2000);
    return () => clearInterval(id);
  }, [media.length]);

  return (
    <>
      <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton href="/programs" label="← Back" />
        
        <div className="mt-12 sm:mt-0 pt-0">
          {purchased && (
            <div className={`mb-4 rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm p-3 sm:p-4 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <p className="text-xs sm:text-sm text-green-400">✓ Successfully purchased! Check your email for program details.</p>
            </div>
          )}

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            {program.title}
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            {program.goal}
          </p>
        </div>

        <div className={`mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
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
                    sizes="(max-width: 768px) 100vw, 768px"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-white/70">
              Level: <strong className="text-white">{program.level}</strong> • {program.weeks} weeks • {program.daysPerWeek} days/week
            </div>
          </div>
        </div>

        <section className={`mt-6 grid gap-4 sm:gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white">What you'll need</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs sm:text-sm text-white/70">
              {program.equipment.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white">Syllabus</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs sm:text-sm text-white/70">
              {program.syllabus.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </section>

        <div className={`sticky bottom-4 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <div>
            <div className="text-[10px] sm:text-xs uppercase text-white/60">One‑time</div>
            <div className="text-base sm:text-lg font-semibold text-white">${program.priceOneOff}.00</div>
          </div>
          <Button 
            variant="ghost" 
            className="h-11 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <Link href={`/checkout/oneoff?slug=${program.slug}`}>Buy Program</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

