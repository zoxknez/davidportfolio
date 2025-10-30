"use client";

import { useMemo, useState } from "react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";

export default function ProgramsPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<string | "">("");
  const [goal, setGoal] = useState<string | "">("");
  const [days, setDays] = useState<number>(0);

  const goals = useMemo(
    () => Array.from(new Set(programs.map((p) => p.goal))),
    []
  );
  const levels = useMemo(
    () => Array.from(new Set(programs.map((p) => p.level))),
    []
  );

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (q && !(`${p.title} ${p.goal}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (level && p.level !== level) return false;
      if (goal && p.goal !== goal) return false;
      if (days && p.daysPerWeek !== days) return false;
      return true;
    });
  }, [q, level, goal, days]);

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-2xl px-6 py-10">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl">Programs</h1>
          <span className="text-xs text-zinc-500">{filtered.length} results</span>
        </div>

        <div className="sticky top-0 z-10 -mx-6 mb-5 border-b bg-white/70 px-6 py-3 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-10 rounded-full border bg-transparent px-4 text-sm outline-none transition focus:border-foreground dark:border-white/10"
            />
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="h-10 rounded-full border bg-transparent px-4 text-sm dark:border-white/10"
            >
              <option value="">Goal</option>
              {goals.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-10 rounded-full border bg-transparent px-4 text-sm dark:border-white/10"
            >
              <option value="">Level</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="h-10 rounded-full border bg-transparent px-4 text-sm dark:border-white/10"
            >
              <option value={0}>Days/w</option>
              {[2, 3, 4, 5, 6].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filtered.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </main>
    </div>
  );
}


