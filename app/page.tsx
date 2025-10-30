import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";
import { BackgroundVideo } from "@/components/background-video";

export default function Home() {
  return (
    <div className="min-h-dvh font-sans text-zinc-900 dark:text-zinc-50">
      <BackgroundVideo />
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-8 px-6 py-12">
        <Hero />
      </main>
    </div>
  );
}
