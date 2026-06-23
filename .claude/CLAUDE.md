# CLAUDE.md

- Use pnpm as package manager
- Use fnm to manage the node version

Sitio personal bilingüe (ES/EN) en Astro 6, estático, sin frameworks de UI. El `README.md` cubre comandos, stack y decisiones de alto nivel; este archivo documenta los patrones que cruzan varios archivos y son fáciles de romper.

## Comandos

```sh
pnpm dev       # dev server en localhost:4321
pnpm build     # build estático en ./dist
pnpm preview   # servir el build localmente
```

## Reglas que cruzan archivos

**Paridad ES/EN.** Cada página, string y pieza de contenido existe por duplicado. Al cambiar algo en un idioma, replícalo en el otro o rompes la paridad:
- `src/pages/index.astro` ↔ `src/pages/en/index.astro` (y lo mismo para `blog/`).
- `src/i18n/ui.ts`: el objeto `ui` tiene claves `es` y `en` con **el mismo set de keys** — `UIKey` se deriva de `es`, así que una key que falte en `en` es un error de tipo. Usa siempre `t(locale, key)`.
- `src/data/profile.ts`: `content` es `Record<Locale, LocalizedContent>` — experiencia, proyectos y about van localizados; `identity` es lo único independiente del idioma.

**Cada página enlaza a su equivalente con `altUrl`.** El `<head>` del `BaseLayout` emite el `hreflang` y el switch de idioma navega ahí. Para posts, ese enlace se construye con `translationSlug`. Si los slugs no coinciden entre `es/` y `en/`, el switch lleva a un 404.

**Estado de publicación del blog** (`status` en el frontmatter, definido en `src/content.config.ts`):
- `draft` → no se construye página ni se lista (filtrado en `getStaticPaths`).
- `unlisted` → página construida y accesible por URL, pero no aparece en listados.
- `published` → construida y listada.

Los filtros viven en `getStaticPaths` (`[slug].astro`) y en los listados (`BlogArchive`, secciones del home). Al tocar la lógica de visibilidad, ajústala en ambos lados o un post listado puede no tener página, o viceversa.

**Frontmatter del blog es obligatorio y tipado.** El schema Zod en `content.config.ts` exige `title`, `description`, `pubDate`, `lang`, `slug`, `translationSlug`, `readingTime`; `tags` y `status` tienen default. Un post sin estos campos rompe `pnpm build`. Los `.md` viven en `src/content/blog/` (no hay subcarpetas por idioma; el idioma lo marca el campo `lang`).

## Componentes (atomic design)

`src/components/{atoms,molecules,organisms}/` — átomos sin lógica de dominio, moléculas las componen, organismos arman secciones completas. Reutiliza el átomo/molécula existente antes de crear uno nuevo. Estilos por componente más tokens globales en `src/styles/global.css` (CSS puro con custom properties; sin librerías de UI).

## Tema (3 modos)

Sistema / claro / oscuro. Un script inline en el `<head>` resuelve el tema antes del primer paint para evitar el flash y guarda la elección explícita en `localStorage`; con JS deshabilitado un `@media` honra la preferencia del OS. No muevas esa lógica a un script diferido ni reintroducirás el flash.
