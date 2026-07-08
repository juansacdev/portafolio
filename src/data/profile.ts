import type { Locale } from '../i18n/ui'

/* ==========================================================================
   Static identity — language-independent
   ========================================================================== */

export const identity = {
  name: 'Juan Sebastián Agudelo',
  nickname: 'Juanse',
  email: 'hey@juansac.dev',
  github: 'https://github.com/juansacdev',
  linkedin: 'https://www.linkedin.com/in/juansacdev',
  handle: '@juansacdev',
  location: 'Bogotá, Colombia',
} as const

/* ==========================================================================
   Localized content
   ========================================================================== */

export interface Hero {
  /** Role label, reused in the header kicker and the footer signature. */
  role: string
  /** Big headline; *italic* marks the accent word. */
  headline: string
  /** Intro paragraphs; supports **bold** / ==mark== / [link](url). */
  lede: string[]
}

export interface CaseStudyResult {
  value: string
  label: string
}

export interface CaseStudy {
  title: string
  /** One-line meta: role · company · dates · scale. */
  role: string
  intro: string
  problem: string
  /** Supports **bold** markers. */
  built: string
  /** The headline result; supports **bold** markers. */
  result: string
  results: CaseStudyResult[]
  /** Closing line; supports [link](url) via emphasize. */
  more: string
}

export interface SkillGroup {
  area: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  company: string
  /** Industry/sector, omitted for consultancies where only the company name is shown. */
  sector?: string
  start: string // year, for <time datetime>
  end: string // year, for <time datetime>
  period: string // human-readable, year-only range
  bullets: string[]
  /** Optional closing note (e.g. press coverage). Supports [link](url) via emphasize. */
  note?: string
}

/**
 * Visibility of a piece of content.
 * - draft: not listed anywhere and not accessible.
 * - unlisted: not listed, but accessible by direct URL (where one exists).
 * - published: listed and accessible.
 */
export type ContentStatus = 'draft' | 'unlisted' | 'published'

export interface Project {
  name: string
  description: string[]
  /** Source code repository. */
  repoUrl?: string
  /** Live deployment of the project. */
  liveUrl?: string
  status: ContentStatus
}

export interface LocalizedContent {
  hero: Hero
  caseStudy: CaseStudy
  experience: ExperienceEntry[]
  projects: Project[]
  skills: SkillGroup[]
  about: string[]
}

export const content: Record<Locale, LocalizedContent> = {
  es: {
    hero: {
      role: 'Senior Software Engineer',
      headline:
        'Diseño, construyo y opero sistemas distribuidos — ahora también con *LLMs*',
      lede: [
        'Soy **Juanse**, Senior Software Engineer con +6 años de experiencia. Diseño, construyo y escalo sistemas distribuidos: robustos, resilientes y seguros.',
        'Trabajo **AI-first**, y eso va en dos vías. **Construyo con AI**: integro LLMs y agentes en mi flujo de trabajo para desarrollar. Y **construyo AI**: diseño productos AI-native —LLMs y agentes en el core— de la spec al eval, hasta producción.',
        'Antes fui founding engineer y tech lead en una fintech: parte del equipo que construyó sus stablecoins sobre Polygon y Celo. Movieron **+US$2,000M** sin un solo incidente.',
      ],
    },
    caseStudy: {
      title: 'Minteo — Stablecoin Settlement Layer',
      role: 'Senior Software Engineer | Founding Team · 2022–2026 · 3 stablecoins en producción',
      intro:
        'La infraestructura de pagos con stablecoins para Latinoamérica. Fui parte del equipo —y lo lideré— que la construyó de cero.',
      problem:
        'Mover dinero entre países en LatAm es lento y caro. Hacía falta un riel de settlement instantáneo y barato, respaldado 1:1 y operable a escala. Sin margen de error: en un sistema financiero, cada peso tiene que cuadrar.',
      built:
        'Diseñé y construí los sistemas, workflows y la arquitectura de las stablecoins **COPM, MXNM y BRLM** sobre Polygon y Celo: el flujo de mint/burn, el settlement entre empresas y la operación que movió dinero real a escala — segura y multi-chain.',
      result:
        'En su mejor mes movió **+US$300M** en volumen transaccional, y **+US$2,000M** en total — sin un solo incidente. El hito llegó a la prensa: La República lo cubrió al superar los US$200M mensuales.',
      results: [
        { value: '+US$2,000M', label: 'volumen transaccional total' },
        { value: '+US$300M', label: 'volumen en el mejor mes' },
        { value: '0', label: 'incidentes con el dinero' },
      ],
      more: 'La blockchain es pública, así que puedes [ver la auditoría on-chain →](https://copm.juansac.dev): cada cifra es verificable.',
    },
    experience: [
      {
        role: 'Senior Software Engineer | Founding Team',
        company: 'Minteo',
        sector: 'Fintech',
        start: '2022',
        end: '2026',
        period: '2022 – 2026',
        bullets: [
          'Lideré el diseño de la plataforma core de liquidación — on/off-ramps, dispersión de fondos, mint/burn, y el módulo de KYC/compliance bajo mandato regulatorio y auditorías externas mensuales.',
          'Operé en producción una plataforma que liquidó más de USD $2B en volumen on-chain en Latinoamérica — con picos de más de USD $300M en un solo mes — soportando a más de 100,000 usuarios finales vía clientes B2B.',
          'Diseñé la arquitectura multi-token y multi-país, y lideré la expansión a nuevas redes blockchain, habilitando un roadmap de seis stablecoins regionales sin reescribir el núcleo.',
          'Lideré un equipo de cuatro a cinco ingenieros durante más de tres años, reportando directamente al CTO.',
        ],
        note: 'El hito llegó a la prensa: [La República cubrió](https://www.larepublica.co/finanzas/como-hacer-transacciones-con-stablecoins-4221338) cuando el sistema superó los US$200M mensuales. Y como la blockchain es pública, [lo audité on-chain](https://copm.juansac.dev): cada cifra es verificable.',
      },
      {
        role: 'Software Engineer',
        company: 'Cóndor Labs',
        start: '2021',
        end: '2022',
        period: '2021 – 2022',
        bullets: [
          'Implementé una capa de caching con Redis sobre las consultas más pesadas de un producto SaaS B2B, reduciendo la latencia percibida en los endpoints de mayor tráfico.',
          'Construí pipelines de CI/CD en GitHub Actions para los servicios backend, eliminando los despliegues manuales.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Arvolution',
        sector: 'Healthtech',
        start: '2021',
        end: '2022',
        period: '2021 – 2022',
        bullets: [
          'Construí workflows ETL en Python sobre AWS Lambda que procesaban datos de incidentes laborales de plantas industriales, alimentando la analítica detrás de reportes regulatorios para clientes como Bavaria.',
          'Implementé APIs GraphQL que exponen datos de incidentes y operaciones a los frontends del producto, sobre una capa de persistencia serverless orientada a eventos.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'TuProp',
        sector: 'Proptech',
        start: '2020',
        end: '2021',
        period: '2020 – 2021',
        bullets: [
          'Ayudé a construir el MVP de la aplicación de punta a punta, en el frontend y en un backend GraphQL.',
          'Integré la API de OpenStreetMap para habilitar mapas y geolocalización en la búsqueda de propiedades.',
          'Construí web scrapers y pipelines ETL con Puppeteer para recolectar y poblar el catálogo de propiedades con nuevos listados.',
        ],
      },
    ],
    projects: [
      {
        name: 'COPM — Auditoría y análisis on-chain',
        description: [
          'Auditoría reproducible de la stablecoin que ayudé a construir en Minteo: 317,696 eventos Transfer escaneados directo de Polygon y Celo vía RPC, ~US$2,046 millones en volumen verificado contra la chain en vivo.',
          'Por NDA no puedo mostrar el código de la empresa — pero la blockchain es pública. Pipeline propio de scanning (sin indexers ni APIs de terceros), validación automatizada, charts SVG generados desde cero y la historia contada para cualquier público.',
        ],
        repoUrl: 'https://github.com/juansacdev/copm-onchain-analysis',
        liveUrl: 'https://copm.juansac.dev',
        status: 'published',
      },
      {
        name: 'Detección de Lengua de Señas Colombiana en tiempo real',
        description: [
          'Un sistema que captura gestos de Lengua de Señas Colombiana (LSC) con la cámara y los traduce a voz sintetizada. Sin intérprete humano de por medio.',
          'Pipeline de visión por computadora end-to-end: detección y tracking de manos en tiempo real, clasificación de gestos con CNNs entrenadas sobre vocabulario LSC, y text-to-speech para cerrar el loop de comunicación sordo ↔ oyente.',
        ],
        status: 'draft',
      },
      {
        name: 'Ajedrez multijugador online',
        description: [
          'Un ajedrez multijugador en tiempo real sin frameworks: vanilla JavaScript y WebSockets. Salas de dos jugadores con estado sincronizado entre clientes en milisegundos.',
          'Sistema turn-based con visibilidad selectiva de jugadas — cada jugador ve únicamente sus movimientos posibles cuando es su turno — y manejo elegante de desconexiones durante la partida.',
        ],
        status: 'draft',
      },
    ],
    skills: [
      {
        area: 'Languages',
        items: ['TypeScript', 'Python'],
      },
      {
        area: 'Frameworks',
        items: ['Fastify', 'FastAPI', 'React', 'Next.js', 'GraphQL'],
      },
      {
        area: 'Cloud & Infra',
        items: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD pipelines'],
      },
      {
        area: 'Async Processing',
        items: ['Temporal.io', 'Message Queues'],
      },
      {
        area: 'Databases',
        items: ['PostgreSQL', 'DynamoDB', 'Redis'],
      },
      {
        area: 'Architecture',
        items: ['Event-driven', 'Serverless'],
      },
      {
        area: 'AI',
        items: ['LLMs', 'AI Agents', 'LangGraph', 'LangFuse'],
      },
    ],
    about: [
      'Me llamo Juan Sebastián Agudelo, pero puedes llamarme Juanse. Empecé a programar a los 19 años, haciendo un pivot a mi vida: era estudiante becado de finanzas.',
      'La curiosidad ha marcado mi vida desde siempre, y fue lo que me motivó a aprender programación de manera autodidacta.',
      'Escribo sobre lo que aprendo en el camino, porque *[enseñar es aprender dos veces](https://es.wikiquote.org/wiki/Joseph_Joubert)*.',
      'Creo profundamente en la educación continua, sea de la forma que sea —formal, en línea o autodidacta—, como manera de seguir creciendo a nivel personal y profesional.',
      'Creo firmemente en que el futuro siempre será mejor. Es la única manera de construirlo.',
      '*Muss es sein?* *Es muss sein!*',
    ],
  },
  en: {
    hero: {
      role: 'Senior Software Engineer',
      headline:
        'I design, build, and operate distributed systems — now with *LLMs* too',
      lede: [
        "I'm **Juanse**, a Senior Software Engineer with 6+ years of experience. I design, build, and scale distributed systems: robust, resilient, and secure.",
        'I work **AI-first**, and that goes two ways. **I build with AI**: I bring LLMs and agents into my workflow to develop. And **I build AI**: I design AI-native products —LLMs and agents at the core— from spec to eval, all the way to production.',
        'Before that I was a founding engineer and tech lead at a fintech: part of the team that built its stablecoins on Polygon and Celo. They moved **+US$2,000M** without a single incident.',
      ],
    },
    caseStudy: {
      title: 'Minteo — Stablecoin Settlement Layer',
      role: 'Senior Software Engineer | Founding Team · 2022–2026 · 3 stablecoins in production',
      intro:
        'The stablecoin payment infrastructure for Latin America. I was part of the team —and led it— that built it from scratch.',
      problem:
        'Moving money across borders in LatAm is slow and expensive. It needed an instant, cheap settlement rail, backed 1:1 and operable at scale. With no margin for error: in a financial system, every cent has to reconcile.',
      built:
        'I designed and built the systems, workflows, and architecture of the **COPM, MXNM, and BRLM** stablecoins on Polygon and Celo: the mint/burn flow, settlement between companies, and the operation that moved real money at scale — secure and multi-chain.',
      result:
        'In its best month it moved **+US$300M** in transactional volume, and **+US$2,000M** in total — without a single incident. The milestone reached the press: La República covered it when it crossed US$200M monthly.',
      results: [
        { value: '+US$2,000M', label: 'total transactional volume' },
        { value: '+US$300M', label: 'volume in the best month' },
        { value: '0', label: 'money incidents' },
      ],
      more: 'The blockchain is public, so you can [see the on-chain audit →](https://copm.juansac.dev): every figure is verifiable.',
    },
    experience: [
      {
        role: 'Senior Software Engineer | Founding Team',
        company: 'Minteo',
        sector: 'Fintech',
        start: '2022',
        end: '2026',
        period: '2022 – 2026',
        bullets: [
          'Led the design of the core settlement platform — on/off-ramps, fund disbursement, mint/burn, and the KYC/compliance module built under regulatory mandate and monthly external audits.',
          'Operated in production a platform that settled over USD $2B in on-chain volume across Latin America — peaking at over USD $300M in a single month — supporting more than 100,000 end users through B2B clients.',
          'Designed the multi-token, multi-country architecture and led the expansion to new blockchain networks, enabling a roadmap of six regional stablecoins without rewriting the core.',
          'Led a team of four to five engineers for over three years, reporting directly to the CTO.',
        ],
        note: 'The milestone reached the press: [La República covered it](https://www.larepublica.co/finanzas/como-hacer-transacciones-con-stablecoins-4221338) when the system crossed US$200M monthly. And since the blockchain is public, [I audited it on-chain](https://copm.juansac.dev): every figure is verifiable.',
      },
      {
        role: 'Software Engineer',
        company: 'Cóndor Labs',
        start: '2021',
        end: '2022',
        period: '2021 – 2022',
        bullets: [
          'Implemented a Redis caching layer over the heaviest database queries of a B2B SaaS product, cutting perceived latency on the highest-traffic endpoints.',
          "Built CI/CD pipelines on GitHub Actions for the client's backend services, eliminating manual deploys and standardizing the release cycle of a five-engineer team.",
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Arvolution',
        sector: 'Healthtech',
        start: '2021',
        end: '2022',
        period: '2021 – 2022',
        bullets: [
          'Built Python ETL workflows on AWS Lambda processing workplace-incident data from industrial plants, feeding the analytics behind regulatory reports for clients such as Bavaria.',
          "Implemented GraphQL APIs exposing incident and operational data to the product's frontends, backed by a serverless, event-driven persistence layer.",
        ],
      },
      {
        role: 'Software Engineer',
        company: 'TuProp',
        sector: 'Proptech',
        start: '2020',
        end: '2021',
        period: '2020 – 2021',
        bullets: [
          "Helped build the company's application MVP end-to-end, contributing across the frontend and a GraphQL backend to launch the product's first version.",
          'Integrated the OpenStreetMap API to power maps and geolocation in the property search experience.',
          'Built web scrapers and ETL pipelines with Puppeteer to collect and populate listings for the property catalog.',
        ],
      },
    ],
    projects: [
      {
        name: 'COPM — On-chain Audit & Analysis',
        description: [
          'Reproducible audit of the stablecoin I helped build at Minteo: 317,696 Transfer events scanned straight from Polygon and Celo via RPC, ~US$2,046 million in volume verified against the live chain.',
          "Under NDA I can't show the company's code — but the blockchain is public. Custom scanning pipeline (no indexers, no third-party APIs), automated validation, SVG charts built from scratch, and the story told for any audience.",
        ],
        repoUrl: 'https://github.com/juansacdev/copm-onchain-analysis',
        liveUrl: 'https://copm.juansac.dev',
        status: 'published',
      },
      {
        name: 'Real-time Colombian Sign Language detection',
        description: [
          'A system that captures Colombian Sign Language (LSC) gestures through the camera and translates them into synthesized speech. No human interpreter required.',
          'End-to-end computer vision pipeline: real-time hand detection and tracking, gesture classification with CNNs trained on LSC vocabulary, and text-to-speech to close the deaf ↔ hearing communication loop.',
        ],
        status: 'draft',
      },
      {
        name: 'Online multiplayer chess',
        description: [
          'A real-time multiplayer chess game with no frameworks: vanilla JavaScript and WebSockets. Two-player rooms with state synchronized across clients in milliseconds.',
          'Turn-based system with selective move visibility — each player only sees their own legal moves on their turn — and graceful disconnection handling throughout the match.',
        ],
        status: 'draft',
      },
    ],
    skills: [
      {
        area: 'Languages',
        items: ['TypeScript', 'Python'],
      },
      {
        area: 'Frameworks',
        items: ['Fastify', 'FastAPI', 'React', 'Next.js', 'GraphQL'],
      },
      {
        area: 'Cloud & Infra',
        items: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD pipelines'],
      },
      {
        area: 'Async Processing',
        items: ['Temporal.io', 'Message Queues'],
      },
      {
        area: 'Databases',
        items: ['PostgreSQL', 'DynamoDB', 'Redis'],
      },
      {
        area: 'Architecture',
        items: ['Event-driven', 'Serverless'],
      },
      {
        area: 'AI',
        items: ['LLMs', 'AI Agents', 'LangGraph', 'LangFuse'],
      },
    ],
    about: [
      "My name is Juan Sebastián Agudelo, but you can call me Juanse. I started programming at 19, pivoting my whole life: I was a finance student on a scholarship.",
      'Curiosity has shaped my life for as long as I can remember, and it is what pushed me to learn programming on my own.',
      'I write about what I learn along the way, because *[to teach is to learn twice](https://en.wikiquote.org/wiki/Joseph_Joubert)*.',
      'I deeply believe in continuous education in every form —formal, online, or self-taught— as the way to keep growing both personally and professionally.',
      'I firmly believe the future will always be better. It is the only way to build it.',
      '*Muss es sein?* *Es muss sein!*',
    ],
  },
}
