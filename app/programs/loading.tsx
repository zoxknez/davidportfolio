import { LoadingSpinner } from "@/components/loading-spinner";

export default function ProgramsLoading() {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-white/70">Loading programs...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

