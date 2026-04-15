import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Términos de uso",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Términos" }]} />
      <div className="rounded-[2rem] border border-border bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-ink">
          Términos de uso
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-ink-muted">
          <p>
            Los textos, ejemplos y plantillas publicados en Discurso360 se
            ofrecen como material de apoyo e inspiración. Antes de utilizar un
            discurso en un acto público, académico, familiar o profesional,
            conviene adaptarlo al contexto real, a la audiencia y al protocolo
            del evento.
          </p>
          <p>
            El usuario es responsable del uso final del contenido, de su
            personalización y de verificar que el texto encaja con la finalidad
            concreta para la que vaya a emplearse. Discurso360 no sustituye el
            asesoramiento profesional en materias legales, educativas,
            protocolares o institucionales.
          </p>
          <p>
            Podemos revisar, actualizar o retirar contenidos cuando sea
            necesario para mejorar su calidad, corregir errores o adecuarlos a
            nuevas necesidades editoriales.
          </p>
        </div>
      </div>
    </div>
  );
}
