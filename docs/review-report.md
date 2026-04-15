# Review Report: discurso360.com
Date: 2026-04-15
Reviewer: Web Factory Reviewer
Verdict: FIX-REQUIRED

## Summary
La base visual y la estructura general son prometedoras, pero el sitio no está listo para lanzar todavía. El principal problema no es solo editorial: la migración de URLs antiguas no está implementada realmente, faltan sitemap/robots, las legales son mínimas e indexables, y el corpus tiene una mezcla de piezas buenas con otras claramente migradas sin suficiente QA.

## Build Verification
- npm run build: PASS
- npm run lint: PASS
- Pages generated: 458 rutas app (442 artículos + categorías + utilidades + legales)

## Navigation QA
URLs revisadas localmente:
- / → carga bien visualmente, pero sigue mostrando señales de migración (“Biblioteca en migracion”, “Una base util ya esta levantada”)
- /buscar → funciona; búsqueda de “quinceanera” devuelve resultado correcto
- /nonexistent-page → 404 visual personalizada existe, pero el HTML no genera title/meta adecuados
- /privacidad → carga, pero es un texto mínimo y está indexable
- /bodas/discurso-padrino-boda → buena pieza base
- /graduaciones/discurso-graduacion-universidad → correcta, pero breve
- /familia/discurso-del-bautismo-sud-para-ninos → carga con artefactos de render (# visibles), señal de parsing/render roto en algunos artículos
- /oratoria/discurso-de-hitler-letra → contenido sensible de baja calidad editorial; no es una pieza lista para producción premium
- /discurso-de-hitler-letra (URL antigua) → rompe en dev con Runtime Error; la migración no funciona realmente

Dominio actual:
- https://discurso360.com/ devuelve 403
- detalle antiguo probado devuelve 404

## Code Inspection
Archivos clave revisados:
- src/app/layout.tsx
- src/app/page.tsx
- src/app/[category]/page.tsx
- src/app/[category]/[slug]/page.tsx
- src/lib/content.ts
- src/lib/seo.ts
- src/components/article/ArticleContent.tsx
- src/data/redirects.json
- next.config.ts
- scripts/migrate.py

Hallazgos:
1. Migración de URLs incompleta / rota
- scripts/migrate.py genera src/data/redirects.json con ~440 mappings
- pero esa tabla no se usa en runtime
- no hay next.config redirects(), ni vercel.json, ni middleware de redirección
- al pedir una URL antigua (/discurso-de-hitler-letra) el entorno devuelve Runtime Error en lugar de redirigir
- con output: "export" en next.config.ts la estrategia actual no resuelve la migración por sí sola

2. SEO básico incompleto
- /robots.txt devuelve 500
- /sitemap.xml devuelve 500
- no existe implementación de sitemap ni robots en src/app
- legales indexables: /privacidad hereda robots index,follow desde layout global
- 404 sin title/meta correctos (curl local devuelve title=None en /nonexistent-page)
- no hay Vercel Analytics en layout.tsx

3. Branding / launch polish
- Logo es una inicial genérica “D” en bloque; no parece marca final
- README sigue siendo el default de create-next-app
- la home contiene copy interno de trabajo/migración, impropio de lanzamiento

4. Render de contenido con bugs
- ArticleContent.tsx usa un parser markdown casero frágil
- en artículos con subtítulos ### aparecen párrafos “#” visibles en navegador
- esto ya se ve en /familia/discurso-del-bautismo-sud-para-ninos

## Content Quality
Lo mejor:
- Hay piezas suficientemente útiles para sacar una primera versión, por ejemplo:
  - /bodas/discurso-padrino-boda
  - /cumpleanos/discurso-quinceanera
  - /graduaciones/discurso-graduacion-universidad
- La home, categorías y búsqueda ya permiten navegar y encontrar contenido.

Lo flojo:
- Calidad muy desigual entre artículos “curados” y artículos migrados casi en bruto
- 112 de 442 artículos tienen menos de 300 palabras útiles aproximadas
- Sigue habiendo entradas sensibles o raras que no están al nivel editorial necesario para un lanzamiento cuidado
- Ejemplos problemáticos:
  - /oratoria/discurso-de-hitler-letra → tema sensible + pieza superficial / poco fiable editorialmente
  - /familia/discurso-del-bautismo-sud-para-ninos → artefactos de render + redacción migrada sin acabado final

## SEO Audit
- Títulos de detalle: en general correctos
- Home title: correcto
- Legal pages: mal, deberían ir noindex
- Sitemap: FAIL
- Robots: FAIL
- 404 metadata: FAIL
- Analytics: FAIL
- Redirect migration SEO: FAIL (crítico)

## Issues Found
### Critical
- URLs antiguas no migran realmente; redirects.json existe pero no se ejecuta
- /robots.txt y /sitemap.xml devuelven 500
- old URLs pueden romper con Runtime Error
- live domain actual no sirve todavía una web funcional (403/404)

### Important
- Home y legales siguen hablando como “sitio en migración”
- legales demasiado mínimas y sin noindex
- contenido desigual; hay artículos sensibles o flojos que deberían rehacerse o retirarse del launch set
- parser markdown produce artefactos visibles en algunas páginas
- falta About / Contact / página de metodología/fuentes si se quiere lanzar con más confianza editorial

### Minor
- logo todavía demasiado genérico
- varias tildes/acentos ausentes en copy visible
- README default sin limpiar

## Recommendation
No lanzaría todavía discurso360.com. Antes del lanzamiento hay que:
1. implementar de verdad la migración de URLs antiguas (redirects en Vercel/vercel.json o estrategia equivalente compatible con output export)
2. añadir robots.txt y sitemap.xml funcionales
3. poner noindex a legales y reescribirlas con contenido real
4. limpiar toda mención a “migración” del front público
5. arreglar el renderer de markdown/MDX
6. revisar y podar el corpus sensible/flojo antes de exponer el dominio
7. hacer una pasada editorial sobre los artículos con más tráfico y los temas más delicados
