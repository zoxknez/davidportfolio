import Image from "next/image";
import { notFound } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = getProgram(params.slug);
  if (!program) return notFound();

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-2xl px-6 py-10">
        <a href="/programs" className="text-sm text-zinc-500 hover:underline">
          ← All programs
        </a>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{program.title}</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">{program.goal}</p>

        <div className="mt-4 overflow-hidden rounded-2xl border bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="relative aspect-[16/9] w-full">
            {program.trailer ? (
              <video className="h-full w-full object-cover" controls playsInline poster={program.image}>
                <source src={program.trailer} type="video/mp4" />
              </video>
            ) : (
              <Image src={program.image} alt={program.title} fill className="object-cover" />
            )}
          </div>
          <div className="p-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Level: <strong className="text-foreground">{program.level}</strong> • {program.weeks} weeks • {program.daysPerWeek} days/week
            </div>
          </div>
        </div>

        <section className="mt-6 grid gap-6">
          <div className="rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">What you'll need</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {program.equipment.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Syllabus</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
              {program.syllabus.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </section>

        <div className="sticky bottom-4 mt-8 flex items-center justify-between rounded-xl border bg-white/80 p-3 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
          <div>
            <div className="text-xs uppercase text-zinc-500">One‑time</div>
            <div className="text-lg font-semibold">${program.priceOneOff}.00</div>
          </div>
          <Button className="h-11 px-5" asChild>
            <a href={`/checkout/oneoff?slug=${program.slug}`}>Buy Program</a>
          </Button>
        </div>
      </main>
    </div>
  );
}


