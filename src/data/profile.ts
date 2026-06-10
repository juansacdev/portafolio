import type { Locale } from '../i18n/ui';

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
      role: 'Software Engineer · Backend, Data & AI',
      tagline: [
        'Construyo sistemas que mueven **dinero real**. Y escribo sobre **cómo funcionan por detrás**.',
        '**+6 años** en backend y sistemas distribuidos — los últimos 4 en **fintech**, construyendo infraestructura de pagos para Latinoamérica.',
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
      'Soy ingeniero de software, de Bogotá. Llevo **+6 años** construyendo backend y sistemas distribuidos.',
      'Los últimos cuatro los pasé en fintech. Entré como junior a Minteo y salí siendo **Tech Lead**, después de construir de cero a producción la infraestructura que orquesta **+USD $200M al mes** en stablecoins reguladas. Ahí aprendí lo que ningún tutorial enseña: lo que pasa cuando el código toca dinero real.',
      'Hoy mi foco es **data**. Me obsesiona el "cómo funciona por detrás": los ledgers, el event sourcing, las redes neuronales, los LLMs. De esa curiosidad sale el blog que estás viendo.',
      'Trabajo **AI-first**. Diseño specs y harnesses para que agentes construyan conmigo — este portafolio incluido. Y escribo sobre lo que aprendo en el camino, porque **explicar algo es la mejor forma de entenderlo**.',
    ],
  },
  en: {
    hero: {
      title: "Hey, I'm **Juanse**",
      role: 'Software Engineer · Backend, Data & AI',
      tagline: [
        'I build systems that move **real money**. And I write about **how they work under the hood**.',
        '**+6 years** in backend and distributed systems — the last 4 in **fintech**, building payment infrastructure for Latin America.',
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
      "I'm a software engineer from Bogotá. I've spent **+6 years** building backend and distributed systems.",
      'The last four were in fintech. I joined Minteo as a junior and left as **Tech Lead**, after building from zero to production the infrastructure that orchestrates **+USD $200M per month** in regulated stablecoins. That is where I learned what no tutorial teaches: what happens when your code touches real money.',
      'Today my focus is **data**. I am obsessed with how things work under the hood: ledgers, event sourcing, neural networks, LLMs. That curiosity is where this blog comes from.',
      'I work **AI-first**. I design specs and harnesses so agents build alongside me — this portfolio included. And I write about what I learn along the way, because **explaining something is the best way to understand it**.',
    ],
  },
};
