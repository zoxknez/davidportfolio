import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 sm:px-6 py-12 z-10">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-white/70">Loading...</p>
      </main>
    </div>
  );
}

