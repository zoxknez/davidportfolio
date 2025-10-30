import Image from "next/image";
import { programs } from "@/data/programs";

export default function ProgramsPage() {
  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">Programs</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore a few demo programs. Content will be dynamic later.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6">
          {programs.map((p) => (
            <a
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="overflow-hidden rounded-2xl border bg-white dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{p.goal}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  {p.weeks} weeks • {p.daysPerWeek} days/week
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}


