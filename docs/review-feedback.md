# Review Feedback: discurso360.com

Verdict: FIX-REQUIRED

Fix list before launch:

1. Implementar migración real de URLs antiguas
- Archivo de mappings: src/data/redirects.json
- Problema: no está conectado a runtime/deploy
- Evidencia: /discurso-de-hitler-letra falla en local y no redirige
- Revisar next.config.ts / vercel.json / middleware / estrategia compatible con output: "export"

2. Crear robots y sitemap
- Actualmente /robots.txt y /sitemap.xml devuelven 500
- Añadir src/app/robots.ts y src/app/sitemap.ts o equivalente compatible

3. Corregir metadata/noindex
- /privacidad y /terminos están indexables
- Añadir robots: { index: false, follow: false }
- 404 necesita metadata propia; ahora /nonexistent-page devuelve HTML sin title

4. Quitar copy de “migración” del front
- src/app/page.tsx contiene mensajes internos de estado
- src/app/terminos/page.tsx también habla de migración en público

5. Arreglar render del contenido
- src/components/article/ArticleContent.tsx usa parsing markdown casero
- En artículos con ### aparecen “#” visibles (ejemplo: /familia/discurso-del-bautismo-sud-para-ninos)

6. Curar el corpus antes del launch
- Podar o reescribir artículos sensibles/de baja calidad
- Ejemplos a revisar primero:
  - src/content/oratoria/discurso-de-hitler-letra.mdx
  - src/content/familia/discurso-del-bautismo-sud-para-ninos.mdx
- Hay 112 artículos por debajo de ~300 palabras; revisar los de más tráfico primero

7. Mejorar launch polish
- Logo aún demasiado genérico (Header.tsx)
- faltan páginas de confianza editorial (About / Contact / metodología)
- revisar acentos/tildes visibles en home
