import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Privacidad" }]} />
      <div className="rounded-[2rem] border border-border bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-bold text-ink">
          Política de privacidad
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-ink-muted">
          <p>
            En Discurso360 tratamos los datos mínimos necesarios para que la web
            funcione correctamente. La navegación pública no exige registro y,
            salvo que se indique lo contrario, no recopilamos datos personales
            identificativos mediante formularios obligatorios.
          </p>
          <p>
            Algunas funciones locales, como favoritos o valoraciones, pueden
            apoyarse en el navegador del usuario para guardar preferencias en el
            propio dispositivo. Si en el futuro se incorporan formularios,
            analítica avanzada o servicios de terceros, esta política se
            actualizará para reflejar la finalidad, base jurídica y plazos de
            conservación aplicables.
          </p>
          <p>
            Si necesitas contactar por una cuestión de privacidad o solicitar la
            revisión de algún contenido, deberás hacerlo a través del canal de
            contacto que se publique en la versión final del sitio.
          </p>
        </div>
      </div>
    </div>
  );
}
