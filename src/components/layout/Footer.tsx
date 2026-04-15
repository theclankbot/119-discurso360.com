import Link from "next/link";
import { categories } from "@/lib/categories";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <BrandLogo light />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Encuentra las palabras perfectas para cada momento especial de tu
              vida. Discursos, frases y textos para toda ocasión.
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Categorías
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-sm text-white/60 hover:text-gold transition-colors py-1"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Recursos
            </h3>
            <div className="space-y-2">
              <Link
                href="/herramientas"
                className="block text-sm text-white/60 hover:text-gold transition-colors py-1"
              >
                Herramientas
              </Link>
              <Link
                href="/buscar"
                className="block text-sm text-white/60 hover:text-gold transition-colors py-1"
              >
                Buscar discursos
              </Link>
              <Link
                href="/oratoria"
                className="block text-sm text-white/60 hover:text-gold transition-colors py-1"
              >
                Guía de oratoria
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Discurso360. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidad"
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
