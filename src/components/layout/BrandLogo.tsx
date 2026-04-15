import Link from "next/link";

export function BrandLogo({
  light = false,
}: {
  light?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-transform group-hover:-translate-y-0.5 ${
          light
            ? "border-gold/30 bg-gold/10 text-gold"
            : "border-navy/10 bg-navy text-white"
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M14.7 3.4 20.6 9a1.5 1.5 0 0 1 0 2.2l-7.7 7.2c-.2.2-.5.4-.8.5l-4.3 1.2a.9.9 0 0 1-1.1-1.1l1.2-4.3c.1-.3.3-.6.5-.8l7.2-7.7a1.5 1.5 0 0 1 2.1-.1ZM8.9 18l2.8-.8-2-1.9-.8 2.7Zm3.7-1.7 6.6-6.3-2.8-2.6-6.3 6.6 2.5 2.3Z" />
        </svg>
      </span>
      <span
        className={`font-serif text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Discurso<span className="text-gold">360</span>
      </span>
    </Link>
  );
}
