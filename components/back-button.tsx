import Link from "next/link";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  href?: string;
  label?: string;
  onClick?: () => void;
};

/**
 * Reusable back/home button component used across multiple pages
 */
export function BackButton({ href = "/", label = "← Home", onClick }: BackButtonProps) {
  const buttonClassName = "h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10";

  if (onClick) {
    return (
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Button variant="ghost" className={buttonClassName} onClick={onClick}>
          {label}
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
      <Button variant="ghost" className={buttonClassName} asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}

