import { ScrollReveal } from "./scroll-reveal";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export function FeaturesSection({
  features,
  title,
  subtitle,
  columns = 3,
}: FeaturesSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <ScrollReveal className="text-center mb-12">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </ScrollReveal>
      )}

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction="up"
              className="group"
            >
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2 cursor-pointer">
                {/* Animated gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="relative w-fit">
                    <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-6 w-6 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-xl border-2 border-white/40 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className="h-0.5 w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

