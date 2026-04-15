import Link from "next/link";
import type { ComponentType } from "react";
import {
  Heart,
  Cake,
  GraduationCap,
  Mic,
  Briefcase,
  Users,
  BookOpen,
  HandHeart,
} from "lucide-react";
import { categories } from "@/lib/categories";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Heart,
  Cake,
  GraduationCap,
  Mic,
  Briefcase,
  Users,
  BookOpen,
  HandHeart,
};

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink mb-4">
          Explora por ocasión
        </h2>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto">
          Encuentra el discurso perfecto para cada momento importante de tu vida
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || BookOpen;
          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group relative bg-white rounded-2xl border border-border p-6 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}10` }}
              >
                <div style={{ color: cat.color }}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {cat.description}
              </p>
              <div className="absolute top-6 right-6 text-border group-hover:text-gold transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
