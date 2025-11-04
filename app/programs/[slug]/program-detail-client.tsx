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
import { ScrollReveal } from "@/components/scroll-reveal";
import { CheckCircle2, Sparkles, Award, Calendar, Dumbbell, ShoppingCart, Clock, TrendingUp } from "lucide-react";

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
      <main className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton href="/programs" label="← Back" />
        
        <div className="mt-12 sm:mt-0 pt-0">
          {purchased && (
            <div className={`mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl p-5 transition-all duration-700 animate-scale-in ${mounted ? "opacity-100" : "opacity-0"}`}>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Purchase Successful!</p>
                  <p className="text-xs text-emerald-400/80 mt-1">Check your email for program details and access instructions.</p>
                </div>
              </div>
            </div>
          )}

          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <Award className="h-4 w-4 text-white/80" />
              <span className="text-xs sm:text-sm font-medium text-white/90 capitalize">{program.level} Program</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              {program.goal}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">{program.weeks} weeks</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <Clock className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">{program.daysPerWeek} days/week</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/80">{program.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden group">
              {media.map((m, i) => (
                <div
                  key={`${m.kind}-${i}`}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === idx ? 1 : 0 }}
                >
                  {m.kind === "video" ? (
                    <video className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" muted playsInline loop autoPlay poster={m.poster}>
                      <source src={m.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image 
                      src={m.src} 
                      alt={`${program.title} - ${program.goal}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 768px"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
              {/* Media counter */}
              {media.length > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                  <span className="text-xs text-white font-medium">{idx + 1} / {media.length}</span>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Equipment & Syllabus */}
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">What You'll Need</h2>
              </div>
              <ul className="space-y-3">
                {program.equipment.map((e, index) => (
                  <li key={e} className="flex items-start gap-3 text-sm text-white/80 animate-slide-up" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Program Overview</h2>
              </div>
              <ol className="space-y-3">
                {program.syllabus.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80 animate-slide-up" style={{ animationDelay: `${0.35 + i * 0.05}s` }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA Section */}
        <ScrollReveal delay={0.3}>
          <div className="sticky bottom-4 mt-10 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase text-white/60 tracking-wide mb-1">One-Time Purchase</div>
                <div className="text-3xl sm:text-4xl font-bold text-white">${program.priceOneOff}</div>
                <p className="text-xs text-white/60 mt-1">Lifetime access • All updates included</p>
              </div>
              <Button 
                variant="ghost" 
                className="w-full sm:w-auto h-12 px-8 rounded-xl border-2 border-white/40 bg-white/20 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105 group" 
                asChild
              >
                <Link href={`/checkout/oneoff?slug=${program.slug}`} className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Buy Program Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}

