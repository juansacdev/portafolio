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
  bullets: string[];
  stack: string[];
}

export interface Project {
  name: string;
  description: string[];
  stack: string[];
  repoUrl?: string;
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
        '+6 años de experiencia. Software Engineer autodidacta enfocado en arquitectura, diseño y escalamiento de sistemas distribuidos — sobre todo en **Ledger y Fintech**.',
        'Construyo sistemas y workflows robustos que mueven **dinero real**.',
        '**Aprendo en público**: escribo explainers de cómo funcionan las cosas por detrás.',
      ],
    },
    experience: [
      {
        company: 'Minteo',
        role: 'Tech Lead (promovido desde Engineer Junior)',
        start: '2022-06',
        end: '2026-05',
        period: 'jun 2022 – may 2026',
        summary:
          'Stablecoin Settlement Layer para Latinoamérica. Regulada por la Superintendencia Financiera de Colombia (SFC), auditada mensualmente por BDO. Multi-chain: Polygon, Celo y Solana.',
        bullets: [
          'Crecí de **engineer junior a Tech Lead** en 4 años, atravesando el pivote completo de la compañía: de NFT marketplace a Stablecoin Settlement Layer. Construí de cero a producción ambos productos.',
          'Lideré el diseño y construcción end-to-end de Stable, la plataforma core: on/off-ramps, workflows de **mint/burn** que sostienen la paridad 1:1 con depósitos bancarios, dispersión de fondos, reportes regulatorios y el módulo de **KYC/compliance**.',
          'Operé en producción la plataforma que orquesta **+USD $200M/mes** en settlement on-chain — **~USD $1.83B acumulados** en 2.6 años, soportando **+100,000 usuarios finales** vía clientes B2B.',
          'Lideré por 3+ años un equipo de **4–5 ingenieros** reportando directamente al CTO, con participación activa en hiring y en las decisiones técnicas críticas del producto.',
        ],
        stack: [
          'TypeScript',
          'Next.js',
          'Fastify',
          'Temporal.io',
          'PostgreSQL',
          'AWS EKS',
          'Terraform',
        ],
      },
      {
        company: 'Cóndor Labs',
        role: 'Backend Developer',
        start: '2021-12',
        end: '2022-05',
        period: 'dic 2021 – may 2022',
        summary:
          'Consultoría de software desarrollando un producto SaaS B2B para un cliente externo. Equipo de ~5 ingenieros.',
        bullets: [
          'Implementé una capa de **caching con Redis** sobre las queries más pesadas, reduciendo la latencia en los endpoints de mayor tráfico.',
          'Construí los pipelines de **CI/CD en GitHub Actions** (lint, test, build, deploy), eliminando los despliegues manuales del equipo.',
          'Elevé la **cobertura de tests** automatizados integrando pytest y Jest como precondición para los releases.',
        ],
        stack: ['Python', 'Node.js', 'Redis', 'AWS', 'GitHub Actions'],
      },
      {
        company: 'Arvolution',
        role: 'Jr Backend Engineer',
        start: '2021-06',
        end: '2021-12',
        period: 'jun 2021 – dic 2021',
        summary:
          'Startup B2B SaaS de gestión de incidentes HSE (Health, Safety & Environment) para clientes industriales como Bavaria (AB InBev).',
        bullets: [
          'Construí workflows **ETL en Python sobre AWS Lambda** que procesaban data de incidentes de seguridad laboral, alimentando reportes regulatorios y dashboards.',
          'Implementé **APIs GraphQL** con DynamoDB y S3 como capa de persistencia event-driven.',
        ],
        stack: ['Python', 'TypeScript', 'GraphQL', 'DynamoDB', 'AWS Lambda'],
      },
    ],
    projects: [
      {
        name: 'Detección de Lengua de Señas Colombiana en tiempo real',
        description: [
          'Un sistema que captura gestos de Lengua de Señas Colombiana (LSC) con la cámara y los traduce a voz sintetizada. Sin intérprete humano de por medio.',
          'Pipeline de visión por computadora end-to-end: detección y tracking de manos en tiempo real, clasificación de gestos con CNNs entrenadas sobre vocabulario LSC, y text-to-speech para cerrar el loop de comunicación sordo ↔ oyente.',
        ],
        stack: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'CNNs'],
      },
      {
        name: 'Ajedrez multijugador online',
        description: [
          'Un ajedrez multijugador en tiempo real sin frameworks: vanilla JavaScript y WebSockets. Salas de dos jugadores con estado sincronizado entre clientes en milisegundos.',
          'Sistema turn-based con visibilidad selectiva de jugadas — cada jugador ve únicamente sus movimientos posibles cuando es su turno — y manejo elegante de desconexiones durante la partida.',
        ],
        stack: ['JavaScript', 'WebSockets', 'Real-time'],
      },
    ],
    about: [
      'Me llamo Juan Sebastián Agudelo, pero puedes llamarme Juanse. ==Empecé a programar a los 19 años, haciendo un pivot a mi vida==: era estudiante becado de finanzas.',
      '==La curiosidad ha marcado mi vida desde siempre==, y fue lo que me motivó a aprender programación de manera autodidacta.',
      'He trabajado para startups y grandes compañías. Entre mis éxitos: fui parte de —y lideré— un equipo pequeño (4~6 devs) que desarrolló una stablecoin (**COPM**) con peg 1:1 sobre las redes de Polygon y Celo. En su mejor mes movió **más de $200M** en volumen transaccional; en total, **casi $2B**. Sin ningún incidente y de manera segura.',
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
        '+6 years of experience. Self-taught Software Engineer focused on the architecture, design, and scaling of distributed systems — especially **Ledgers and Fintech**.',
        'I build robust systems and workflows that move **real money**.',
        '**I learn in public**: I write explainers on how things work under the hood.',
      ],
    },
    experience: [
      {
        company: 'Minteo',
        role: 'Tech Lead (promoted from Junior Engineer)',
        start: '2022-06',
        end: '2026-05',
        period: 'Jun 2022 – May 2026',
        summary:
          "Stablecoin Settlement Layer for Latin America. Regulated by Colombia's financial regulator (SFC), audited monthly by BDO. Multi-chain: Polygon, Celo, and Solana.",
        bullets: [
          "Grew from **junior engineer to Tech Lead** in 4 years, navigating the company's full pivot: from NFT marketplace to Stablecoin Settlement Layer. Built both products from zero to production.",
          'Led the end-to-end design and construction of Stable, the core platform: on/off-ramps, **mint/burn** workflows that uphold the 1:1 parity with bank deposits, fund disbursement, regulatory reporting, and the **KYC/compliance** module.',
          'Operated in production the platform that orchestrates **+USD $200M/month** in on-chain settlement — **~USD $1.83B cumulative** over 2.6 years, supporting **+100,000 end users** through B2B clients.',
          'Led a team of **4–5 engineers** for 3+ years, reporting directly to the CTO, with active participation in hiring and in the critical technical decisions of the product.',
        ],
        stack: [
          'TypeScript',
          'Next.js',
          'Fastify',
          'Temporal.io',
          'PostgreSQL',
          'AWS EKS',
          'Terraform',
        ],
      },
      {
        company: 'Cóndor Labs',
        role: 'Backend Developer',
        start: '2021-12',
        end: '2022-05',
        period: 'Dec 2021 – May 2022',
        summary:
          'Software consultancy building a B2B SaaS product for an external client. Team of ~5 engineers.',
        bullets: [
          'Implemented a **Redis caching layer** over the heaviest database queries, cutting latency on the highest-traffic endpoints.',
          'Built the **CI/CD pipelines on GitHub Actions** (lint, test, build, deploy), eliminating the team’s manual deploys.',
          'Raised automated **test coverage** by integrating pytest and Jest as a precondition for releases.',
        ],
        stack: ['Python', 'Node.js', 'Redis', 'AWS', 'GitHub Actions'],
      },
      {
        company: 'Arvolution',
        role: 'Jr Backend Engineer',
        start: '2021-06',
        end: '2021-12',
        period: 'Jun 2021 – Dec 2021',
        summary:
          'B2B SaaS startup for industrial HSE (Health, Safety & Environment) incident management, serving clients like Bavaria (AB InBev).',
        bullets: [
          'Built **Python ETL workflows on AWS Lambda** processing workplace-incident data, feeding regulatory reports and dashboards.',
          'Implemented **GraphQL APIs** backed by DynamoDB and S3 as the event-driven persistence layer.',
        ],
        stack: ['Python', 'TypeScript', 'GraphQL', 'DynamoDB', 'AWS Lambda'],
      },
    ],
    projects: [
      {
        name: 'Real-time Colombian Sign Language detection',
        description: [
          'A system that captures Colombian Sign Language (LSC) gestures through the camera and translates them into synthesized speech. No human interpreter required.',
          'End-to-end computer vision pipeline: real-time hand detection and tracking, gesture classification with CNNs trained on LSC vocabulary, and text-to-speech to close the deaf ↔ hearing communication loop.',
        ],
        stack: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'CNNs'],
      },
      {
        name: 'Online multiplayer chess',
        description: [
          'A real-time multiplayer chess game with no frameworks: vanilla JavaScript and WebSockets. Two-player rooms with state synchronized across clients in milliseconds.',
          'Turn-based system with selective move visibility — each player only sees their own legal moves on their turn — and graceful disconnection handling throughout the match.',
        ],
        stack: ['JavaScript', 'WebSockets', 'Real-time'],
      },
    ],
    about: [
      "My name is Juan Sebastián Agudelo, but you can call me Juanse. ==I started programming at 19, pivoting my whole life==: I was a finance student on a scholarship.",
      "==Curiosity has shaped my life for as long as I can remember==, and it is what pushed me to learn programming on my own.",
      'I have worked for startups and large companies. Among my wins: I was part of —and led— a small team (4~6 devs) that built a stablecoin (**COPM**) with a 1:1 peg on Polygon and Celo. In its best month it moved **over $200M** in transactional volume; in total, **almost $2B**. Without a single incident, and securely.',
      'I write about what I learn along the way, because *[to teach is to learn twice](https://en.wikiquote.org/wiki/Joseph_Joubert)*.',
      '==I deeply believe in continuous education== in every form —formal, online, or self-taught— as the way to keep growing both personally and professionally.',
      'I firmly believe ==the future will always be better==. It is the only way to build it.',
      '*Muss es sein?* *Es muss sein!*',
    ],
  },
};
