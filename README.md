# Portafolio — Juan Sebastián Agudelo

Sitio personal bilingüe (ES/EN) construido con [Astro](https://astro.build). Estático, sin trackers, sin frameworks de UI.

## Stack

- **Astro 6** — output estático, i18n nativo, content collections para el blog.
- **CSS puro** — design tokens con custom properties, sin librerías.
- **Node 22** — fijado en `.node-version` (fnm lo toma automáticamente).

## Comandos

```sh
npm install      # instalar dependencias
npm run dev      # dev server en localhost:4321
npm run build    # build estático en ./dist
npm run preview  # servir el build localmente
```

## Arquitectura

Atomic design, de menor a mayor:

```text
src/
├── components/
│   ├── atoms/        # Avatar, Tag, SocialLink, SectionTitle, ThemeToggle, LanguageSwitch
│   ├── molecules/    # TagList, ContactLinks, ExperienceItem, ProjectCard, BlogCard
│   └── organisms/    # SiteHeader, Hero, secciones, BlogPost, SiteFooter
├── layouts/          # BaseLayout (template)
├── pages/            # ES en raíz, EN bajo /en/
├── content/blog/     # posts markdown por idioma (es/, en/)
├── data/profile.ts   # contenido localizado: experiencia, proyectos, about
├── i18n/ui.ts        # strings de UI y anchors por idioma
└── styles/global.css # tokens y estilos base
```

## Decisiones

- **i18n por rutas**: español en `/`, inglés en `/en/`. El botón de idioma navega a la página equivalente en el otro idioma (`hreflang` incluido en el `<head>`).
- **Tema claro/oscuro**: un script inline en el `<head>` resuelve el tema antes del primer paint (evita el flash). Prioridad: `localStorage` → `prefers-color-scheme`. Con JS deshabilitado, un bloque `@media` honra la preferencia del sistema.
- **Blog**: content collections con frontmatter tipado (Zod). Cada post declara su `slug` y el `translationSlug` de su versión en el otro idioma.
- **HTML semántico**: `header`, `nav`, `main`, `section`, `article`, `address`, `time`, `footer`. Sin div-soup.
