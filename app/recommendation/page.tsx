import { Button } from "@/components/ui/button";

export default function RecommendationPage({ searchParams }: { searchParams: Record<string, string> }) {
  const goal = searchParams.goal ?? "fat-loss";
  const days = Number(searchParams.days ?? 3);
  const sex = searchParams.sex ?? "male";

  const pick = (() => {
    if (goal === "muscle") return "functional-bodybuilding";
    if (goal === "performance") return "hyrox-prep";
    return sex === "female" ? "womens-strength" : "functional-bodybuilding";
  })();

  const label = {
    "functional-bodybuilding": "Functional Bodybuilding",
    "hyrox-prep": "HYROX Prep",
    "womens-strength": "Women’s Strength",
  }[pick];

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 py-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">Your Recommendation</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Goal: <strong>{goal}</strong> • Days/week: <strong>{days}</strong> • Sex: <strong>{sex}</strong>
        </p>
        <div className="mt-2 rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">{label}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Personalized pick based on your answers. Full logic will be powered by rules later.
          </p>
          <div className="mt-4 flex gap-2">
            <Button asChild>
              <a href={`/programs/${pick}`}>View Program</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/programs">See All</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}


