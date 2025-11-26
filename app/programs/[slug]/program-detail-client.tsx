"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { createProgramMedia, type Media } from "@/lib/program-media";
import { BackButton } from "@/components/back-button";
import { CheckCircle2, Award, Calendar, Dumbbell, ShoppingCart, Clock, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgramDetailClient({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const searchParams = useSearchParams();
  const purchased = searchParams.get("purchased") === "true";
  
  const params = use(paramsPromise);
  const program = getProgram(params.slug);
  if (!program) return notFound();

  const media: Media[] = useMemo(() => createProgramMedia(program, false), [program]);

  const [idx, setIdx] = useState(0);
  
  // Auto-advance carousel
  useEffect(() => {
    if (media.length < 2) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % media.length);
    }, 5000); // Slower interval for better UX
    return () => clearInterval(timer);
  }, [media.length]);

  const nextSlide = () => setIdx((prev) => (prev + 1) % media.length);
  const prevSlide = () => setIdx((prev) => (prev - 1 + media.length) % media.length);

  return (
    <>
      <main className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton href="/programs" label="← Back" />
        
        <div className="mt-12 sm:mt-0 pt-0">
          {purchased && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl p-5"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Purchase Successful!</p>
                  <p className="text-xs text-emerald-400/80 mt-1">Check your email for program details and access instructions.</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
              {[
                { icon: Calendar, text: `${program.weeks} weeks` },
                { icon: Clock, text: `${program.daysPerWeek} days/week` },
                { icon: TrendingUp, text: program.level }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <stat.icon className="h-4 w-4 text-white/60" />
                  <span className="text-sm text-white/80 capitalize">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Media Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative group"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {media[idx] && (media[idx].kind === "video" ? (
                  <video className="h-full w-full object-cover" muted playsInline loop autoPlay poster={media[idx].poster}>
                    <source src={media[idx].src} type="video/mp4" />
                  </video>
                ) : (
                  <Image 
                    src={media[idx].src} 
                    alt={`${program.title} - ${program.goal}`} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Controls */}
            {media.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.preventDefault(); prevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); nextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {media.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-white w-4" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Equipment & Syllabus */}
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">What You'll Need</h2>
            </div>
            <ul className="space-y-3">
              {program.equipment.map((e, index) => (
                <motion.li 
                  key={e} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{e}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-xl border border-white/20 bg-white/10 p-2.5">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Program Overview</h2>
            </div>
            <ol className="space-y-3">
              {program.syllabus.map((s, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex gap-3 text-sm text-white/80"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
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
        </motion.div>
      </main>
    </>
  );
}

