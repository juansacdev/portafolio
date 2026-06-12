import type { Locale } from '../i18n/ui'

/* ==========================================================================
   Static identity — language-independent
   ========================================================================== */

export const identity = {
  name: 'Juan Sebastián Agudelo',
  nickname: 'Juanse',
  email: 'juansac.me@gmail.com',
  github: 'https://github.com/juansacdev',
  linkedin: 'https://www.linkedin.com/in/juansacdev',
  handle: '@juansacdev',
  location: 'Bogotá, Colombia',
} as const;

/* ==========================================================================
   Localized content
   ========================================================================== */

export interface Hero {
  /** Main heading; supports **markers** for accent color. */
  title: string;
  role: string;
  tagline: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  start: string; // ISO date for <time datetime>
  end: string;
  period: string; // human-readable range
  summary: string;
  /** Narrative paragraphs. Takes precedence over bullets when present. */
  paragraphs?: string[];
  bullets?: string[];
}

/**
 * Visibility of a piece of content.
 * - draft: not listed anywhere and not accessible.
 * - unlisted: not listed, but accessible by direct URL (where one exists).
 * - published: listed and accessible.
 */
export type ContentStatus = 'draft' | 'unlisted' | 'published';

export interface Project {
  name: string;
  description: string[];
  stack: string[];
  /** Source code repository. */
  repoUrl?: string;
  /** Live deployment of the project. */
  liveUrl?: string;
  status: ContentStatus;
}

export interface LocalizedContent {
  hero: Hero;
  experience: ExperienceEntry[];
  projects: Project[];
  about: string[];
}

export const content: Record<Locale, LocalizedContent> = {
  es: {
    hero: {
      title: 'Hey, soy **Juanse**',
      role: 'Distributed Systems & Architecture · AI/ML',
      tagline: [
        '+6 años de experiencia. Software Engineer autodidacta enfocado en arquitectura, diseño y escalamiento de sistemas distribuidos.',
        '**AI-first**: diseño specs y harnesses para LLMs y agentes.',
        '**Aprendo en público**: escribo explainers de cómo funcionan las cosas por detrás.',
      ],
    },
    experience: [
      {
        company: 'Minteo · Fintech',
        role: 'Founding Software Engineer – Tech Lead',
        start: '2022-06',
        end: '2026-06',
        period: 'jun 2022 – jun 2026',
        summary: 'Stablecoin Settlement Layer para Latinoamérica.',
        paragraphs: [
          'Fui parte del equipo que desarrolló las stablecoins **COPM, MXNM y BRLM** sobre múltiples chains como Polygon y Celo.',
          'Nuestra misión era construir la infraestructura de pagos para Latinoamérica. Diseñamos y construimos los sistemas, los workflows y la arquitectura que movió dinero real: **más de US$300M** en el mejor mes y **más de US$2,000M** en total, en volumen transaccional.',
          'El hito llegó a la prensa: [La República cubrió](https://www.larepublica.co/finanzas/como-hacer-transacciones-con-stablecoins-4221338) cuando el sistema superó los US$200M mensuales. Y como la blockchain es pública, [lo audité on-chain](https://copm.juansac.dev): cada cifra es verificable.',
        ],
      },
      {
        company: 'Cóndor Labs · Software Consultancy',
        role: 'Backend Developer',
        start: '2021-12',
        end: '2022-05',
        period: 'dic 2021 – may 2022',
        summary: 'Consultora de software colombiana para productos SaaS B2B.',
        paragraphs: [
          'Trabajé en el backend del producto SaaS B2B de un cliente externo: implementé la capa de **caching con Redis** sobre las queries más pesadas, reduciendo la latencia en los endpoints de mayor tráfico.',
          'También construí los pipelines de **CI/CD en GitHub Actions**, eliminando los despliegues manuales del equipo, y elevé la cobertura de tests con pytest y Jest como precondición de cada release.',
        ],
      },
      {
        company: 'Arvolution · HSE Tech',
        role: 'Jr Backend Engineer',
        start: '2021-06',
        end: '2021-12',
        period: 'jun 2021 – dic 2021',
        summary:
          'Inspecciones y gestión de incidentes HSE para la industria en Latinoamérica.',
        paragraphs: [
          'Trabajé con clientes industriales como **Bavaria (AB InBev)**: construí los workflows **ETL en Python sobre AWS Lambda** que procesaban la data de incidentes de seguridad reportados en planta, alimentando los reportes regulatorios y dashboards del producto.',
          'También implementé las **APIs GraphQL** del producto, con DynamoDB y S3 como capa de persistencia event-driven.',
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
        stack: ['Node.js', 'viem', 'Polygon', 'Celo', 'Data Engineering'],
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
        stack: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'CNNs'],
        status: 'draft',
      },
      {
        name: 'Ajedrez multijugador online',
        description: [
          'Un ajedrez multijugador en tiempo real sin frameworks: vanilla JavaScript y WebSockets. Salas de dos jugadores con estado sincronizado entre clientes en milisegundos.',
          'Sistema turn-based con visibilidad selectiva de jugadas — cada jugador ve únicamente sus movimientos posibles cuando es su turno — y manejo elegante de desconexiones durante la partida.',
        ],
        stack: ['JavaScript', 'WebSockets', 'Real-time'],
        status: 'draft',
      },
    ],
    about: [
      'Me llamo Juan Sebastián Agudelo, pero puedes llamarme Juanse. ==Empecé a programar a los 19 años, haciendo un pivot a mi vida==: era estudiante becado de finanzas.',
      '==La curiosidad ha marcado mi vida desde siempre==, y fue lo que me motivó a aprender programación de manera autodidacta.',
      'He trabajado para startups y grandes compañías. Entre mis éxitos: fui parte de —y lideré— un equipo pequeño (4~6 devs) que desarrolló una stablecoin (**COPM**) con peg 1:1 sobre las redes de Polygon y Celo. En su mejor mes movió **más de US$300M** en volumen transaccional; en total, **más de $2B**. Sin ningún incidente y de manera segura.',
      'Escribo sobre lo que aprendo en el camino, porque *[enseñar es aprender dos veces](https://es.wikiquote.org/wiki/Joseph_Joubert)*.',
      '==Creo profundamente en la educación continua==, sea de la forma que sea —formal, en línea o autodidacta—, como manera de seguir creciendo a nivel personal y profesional.',
      'Creo firmemente en que ==el futuro siempre será mejor==. Es la única manera de construirlo.',
      '*Muss es sein?* *Es muss sein!*',
    ],
  },
  en: {
    hero: {
      title: "Hey, I'm **Juanse**",
      role: 'Distributed Systems & Architecture · AI/ML',
      tagline: [
        '+6 years of experience. Self-taught Software Engineer focused on the architecture, design, and scaling of distributed systems.',
        '**AI-first**: I design specs and harnesses for LLMs and agents.',
        '**I learn in public**: I write explainers on how things work under the hood.',
      ],
    },
    experience: [
      {
        company: 'Minteo · Fintech',
        role: 'Founding Software Engineer – Tech Lead',
        start: '2022-06',
        end: '2026-06',
        period: 'Jun 2022 – Jun 2026',
        summary: 'Stablecoin Settlement Layer for Latin America.',
        paragraphs: [
          'I was part of the team that built the **COPM, MXNM, and BRLM** stablecoins on multiple chains such as Polygon and Celo.',
          'Our mission was to build the payment infrastructure for Latin America. We designed and built the systems, workflows, and architecture that moved real money: **over US$300M** in the best month and **over US$2,000M** in total transactional volume.',
          'The milestone reached the press: [La República covered it](https://www.larepublica.co/finanzas/como-hacer-transacciones-con-stablecoins-4221338) when the system crossed US$200M monthly. And since the blockchain is public, [I audited it on-chain](https://copm.juansac.dev): every figure is verifiable.',
        ],
      },
      {
        company: 'Cóndor Labs · Software Consultancy',
        role: 'Backend Developer',
        start: '2021-12',
        end: '2022-05',
        period: 'Dec 2021 – May 2022',
        summary: 'Colombian software consultancy building B2B SaaS products.',
        paragraphs: [
          "I worked on the backend of an external client's B2B SaaS product: I implemented the **Redis caching layer** over the heaviest queries, cutting latency on the highest-traffic endpoints.",
          'I also built the **CI/CD pipelines on GitHub Actions**, eliminating the team’s manual deploys, and raised test coverage with pytest and Jest as a precondition for every release.',
        ],
      },
      {
        company: 'Arvolution · HSE Tech',
        role: 'Jr Backend Engineer',
        start: '2021-06',
        end: '2021-12',
        period: 'Jun 2021 – Dec 2021',
        summary:
          'Inspections and HSE incident management for industry across Latin America.',
        paragraphs: [
          'I worked with industrial clients such as **Bavaria (AB InBev)**: I built the **Python ETL workflows on AWS Lambda** that processed safety-incident data reported from plants, feeding the product’s regulatory reports and dashboards.',
          'I also implemented the product’s **GraphQL APIs**, backed by DynamoDB and S3 as the event-driven persistence layer.',
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
        stack: ['Node.js', 'viem', 'Polygon', 'Celo', 'Data Engineering'],
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
        stack: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'CNNs'],
        status: 'draft',
      },
      {
        name: 'Online multiplayer chess',
        description: [
          'A real-time multiplayer chess game with no frameworks: vanilla JavaScript and WebSockets. Two-player rooms with state synchronized across clients in milliseconds.',
          'Turn-based system with selective move visibility — each player only sees their own legal moves on their turn — and graceful disconnection handling throughout the match.',
        ],
        stack: ['JavaScript', 'WebSockets', 'Real-time'],
        status: 'draft',
      },
    ],
    about: [
      "My name is Juan Sebastián Agudelo, but you can call me Juanse. ==I started programming at 19, pivoting my whole life==: I was a finance student on a scholarship.",
      "==Curiosity has shaped my life for as long as I can remember==, and it is what pushed me to learn programming on my own.",
      'I have worked for startups and large companies. Among my wins: I was part of —and led— a small team (4~6 devs) that built a stablecoin (**COPM**) with a 1:1 peg on Polygon and Celo. In its best month it moved **over US$300M** in transactional volume; in total, **over $2B**. Without a single incident, and securely.',
      'I write about what I learn along the way, because *[to teach is to learn twice](https://en.wikiquote.org/wiki/Joseph_Joubert)*.',
      '==I deeply believe in continuous education== in every form —formal, online, or self-taught— as the way to keep growing both personally and professionally.',
      'I firmly believe ==the future will always be better==. It is the only way to build it.',
      '*Muss es sein?* *Es muss sein!*',
    ],
  },
};
