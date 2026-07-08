export type Locale = 'es' | 'en';

export const ui = {
  es: {
    'meta.description':
      'Juan Sebastián Agudelo — software engineer de Bogotá. Sistemas distribuidos, arquitectura de software, ledgers y fintech. Escribo sobre cómo funcionan las cosas por detrás.',
    'nav.caseStudy': 'Case study',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre mí',
    'nav.label': 'Navegación principal',
    'nav.available': 'Open to work',
    'nav.home': 'inicio',
    'lang.switch': 'Switch to English',
    'lang.switchShort': 'EN',
    'hero.available': 'Disponible para trabajar',
    'hero.talk': 'Hablemos',
    'hero.seeCase': 'Ver el case study',
    'contact.cta': 'Contáctame',
    'section.caseStudy': 'Case study',
    'section.experience': 'Experiencia laboral',
    'section.projects': 'Proyectos',
    'section.blog': 'Blog',
    'section.about': 'Sobre mí',
    'section.contact': 'Contacto',
    'cs.problem': 'El problema',
    'cs.built': 'Qué construí',
    'cs.result': 'El resultado',
    'cs.results': 'Resultados',
    'cs.verified': 'Verificable on-chain',
    'skills.title': 'Habilidades',
    'about.downloadCv': 'Descargar CV',
    'footer.rights': 'Todos los derechos reservados',
    'blog.readMore': 'Leer el post',
    'blog.backToHome': 'Volver al inicio',
    'blog.published': 'Publicado el',
    'blog.viewAll': 'Ver todos los posts',
    'blog.allTitle': 'Todos los posts',
    'blog.allIntro':
      'Explainers de "cómo funciona X por detrás": los internals que me dan curiosidad, explicados como me hubiera gustado que me los explicaran.',
    'contact.intro':
      '¿Quieres hablar de un rol, un proyecto o un post? Escríbeme.',
    'footer.builtWith': 'Hecho con 🫀',
    'a11y.avatarAlt': 'Avatar de Juan Sebastián Agudelo',
  },
  en: {
    'meta.description':
      'Juan Sebastián Agudelo — software engineer from Bogotá. Distributed systems, software architecture, ledgers, and fintech. I write about how things work under the hood.',
    'nav.caseStudy': 'Case study',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.label': 'Main navigation',
    'nav.available': 'Open to work',
    'nav.home': 'home',
    'lang.switch': 'Cambiar a español',
    'lang.switchShort': 'ES',
    'hero.available': 'Open to work',
    'hero.talk': "Let's talk",
    'hero.seeCase': 'See the case study',
    'contact.cta': 'Contact me',
    'section.caseStudy': 'Case study',
    'section.experience': 'Work experience',
    'section.projects': 'Projects',
    'section.blog': 'Blog',
    'section.about': 'About me',
    'section.contact': 'Contact',
    'cs.problem': 'The problem',
    'cs.built': 'What I built',
    'cs.result': 'The result',
    'cs.results': 'Results',
    'cs.verified': 'Verifiable on-chain',
    'skills.title': 'Skills',
    'about.downloadCv': 'Download CV',
    'footer.rights': 'All rights reserved',
    'blog.readMore': 'Read the post',
    'blog.backToHome': 'Back to home',
    'blog.published': 'Published on',
    'blog.viewAll': 'View all posts',
    'blog.allTitle': 'All posts',
    'blog.allIntro':
      'Explainers on "how X works under the hood": the internals I am curious about, explained the way I wish someone had explained them to me.',
    'contact.intro':
      'Want to talk about a role, a project, or a post? Reach out.',
    'footer.builtWith': 'Built with 🫀',
    'a11y.avatarAlt': 'Avatar of Juan Sebastián Agudelo',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key];
}

/** Section anchor ids, localized so URLs read naturally in each language. */
export const anchors = {
  es: {
    caseStudy: 'case-study',
    experience: 'experiencia',
    projects: 'proyectos',
    blog: 'blog',
    about: 'sobre-mi',
    contact: 'contacto',
  },
  en: {
    caseStudy: 'case-study',
    experience: 'experience',
    projects: 'projects',
    blog: 'blog',
    about: 'about',
    contact: 'contact',
  },
} as const satisfies Record<Locale, Record<string, string>>;
