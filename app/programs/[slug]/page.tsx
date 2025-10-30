"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Media = { kind: "image"; src: string } | { kind: "video"; src: string; poster?: string };

function ProgramDetailContent({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const purchased = searchParams.get("purchased") === "true";
  
  const program = getProgram(params.slug);
  if (!program) return notFound();

  useEffect(() => setMounted(true), []);

  const media: Media[] = useMemo(() => {
    const arr: Media[] = [];
    if (program.image) arr.push({ kind: "image", src: program.image });
    if (program.gallery?.length) arr.push(...program.gallery.map((g) => ({ kind: "image", src: g } as Media)));
    if (program.trailer) arr.push({ kind: "video", src: program.trailer, poster: program.image });
    return arr;
  }, [program.image, program.gallery, program.trailer]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (media.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 2000);
    return () => clearInterval(id);
  }, [media.length]);

  return (
    <>
      <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <a href="/programs">← Back</a>
          </Button>
        </div>
        
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
                  <Image src={m.src} alt={program.title} fill className="object-cover" />
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
            <a href={`/checkout/oneoff?slug=${program.slug}`}>Buy Program</a>
          </Button>
        </div>
      </main>
    </>
  );
}

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <Suspense fallback={
        <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10 flex items-center justify-center min-h-dvh">
          <div className="text-white/70">Loading...</div>
        </main>
      }>
        <ProgramDetailContent params={params} />
      </Suspense>
    </div>
  );
}
