"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { categories } from "@/lib/categories";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-cream-dark rounded-lg transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink hover:bg-cream-dark rounded-lg transition-colors">
                Más
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.slice(6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="block px-4 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-cream-dark first:rounded-t-xl last:rounded-b-xl"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/buscar"
              className="p-2.5 text-ink-muted hover:text-ink hover:bg-cream-dark rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              className="lg:hidden p-2.5 text-ink-muted hover:text-ink hover:bg-cream-dark rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="block px-4 py-3 text-sm font-medium text-ink-muted hover:text-ink hover:bg-cream-dark rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border-light">
              <Link
                href="/herramientas"
                className="block px-4 py-3 text-sm font-medium text-gold hover:text-gold-light hover:bg-cream-dark rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Herramientas
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
