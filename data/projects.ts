import { Project } from "@/components/ui/ProjectCard";

// ─── Extended project type with case-study detail ────────────────────────────
export interface ProjectDetail extends Project {
  overview: string;
  problem: string;
  features: string[];
  architecture: string;
  challenges: string[];
  optimizations: string[];
  uxDecisions: string[];
  responsibilities: string[];
  demoNote?: string;
}

export const projects: ProjectDetail[] = [
  {
    id: "stayease",
    title: "StayEase",
    tagline: "Hotel Booking Platform",
    description:
      "Full-stack hotel booking platform with intelligent geo-search, real-time availability, and secure reservation flows. 95% booking completion rate via streamlined UX and payment-gateway integration.",
    image: "/images/stayease.png",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Stripe", "Mapbox GL"],
    metrics: {
      performance: "95% completion rate",
      users: "Geo-search enabled",
    },
    links: {
      github: "https://github.com/bhanurx100/stayease-hotel-booking-platform",
      live: "https://stayease-hotel-booking-platform.vercel.app/",
    },
    featured: true,

    overview:
      "StayEase is a hotel discovery and booking platform that lets travelers filter properties by map area, dates, and amenities, then complete a secure checkout in under 60 seconds. The product was designed to validate a lean OTA (online travel agency) idea with real payment flows.",
    problem:
      "Existing OTA flows suffered from high drop-off at the checkout step due to page reloads and unclear availability feedback. The challenge was to build a no-reload booking funnel with instant availability checks and frictionless payment.",
    features: [
      "Mapbox GL geolocation search with bounding-box filtering",
      "Date-range availability engine with real-time conflict detection",
      "Stripe payment integration with idempotent charge handling",
      "Booking confirmation emails via Nodemailer",
      "Host dashboard for property and reservation management",
      "Review and rating system with moderation queue",
      "Responsive image gallery with lazy-loading",
    ],
    architecture:
      "React SPA fronted by an Express/Node.js REST API. MongoDB stores property listings, availability calendars (sparse date arrays), and booking records. Stripe webhooks handle async payment state transitions. Mapbox GL JS renders the live property map without a full-page reload.",
    challenges: [
      "Preventing double-booking race conditions — solved with MongoDB optimistic locking on the availability document",
      "Keeping the map and list view in sync without a state management library — used URL search params as the single source of truth",
      "Stripe webhook reliability — implemented idempotency keys and a retry queue for failed events",
    ],
    optimizations: [
      "Skeleton loading states eliminated perceived wait time for map tile loads",
      "Debounced map-move events reduced API calls during pan/zoom by ~70%",
      "Compressed property images via Sharp at upload time (avg 400KB → 80KB)",
    ],
    uxDecisions: [
      "Split-screen layout (map left, cards right) mirrors Google Maps / Airbnb mental models",
      "Date picker shows greyed-out unavailable dates to eliminate invalid submissions",
      "Single-page checkout with progress indicator instead of multi-step form",
    ],
    responsibilities: [
      "Full-stack development (React frontend, Node/Express backend)",
      "MongoDB schema and availability calendar design",
      "Stripe payment and webhook integration",
      "Mapbox GL JS map layer implementation",
      "Responsive UI and mobile checkout flow",
    ],
  },

  {
    id: "stockpilot",
    title: "StockPilot",
    tagline: "Inventory Management SaaS Dashboard",
    description:
      "Scalable SaaS inventory dashboard with real-time stock monitoring, automated reordering, and interactive analytics. 3× faster queries via MongoDB indexing and virtualized tables handling 10k+ SKUs.",
    image: "/images/stockpilot.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Recharts", "SWR"],
    metrics: {
      performance: "3× faster queries",
      scale: "10k+ items",
    },
    links: {
      github: "https://github.com/bhanurx100/stockpilot-inventory-saas",
      live: "#",
    },
    featured: true,

    // ── Case-study content ──
    overview:
      "StockPilot is a full-stack SaaS platform designed to replace spreadsheet-based inventory workflows for small-to-mid-sized businesses. The dashboard surfaces real-time stock levels, low-stock alerts, supplier performance, and revenue trends inside a single cohesive UI.",
    problem:
      "SMB warehouse teams were spending 3–4 hours per day cross-referencing Excel sheets and manually triggering purchase orders. The goal was to cut that time by 80% through automation and a single source of truth.",
    features: [
      "Real-time stock level monitoring with WebSocket-backed updates",
      "Automated low-stock alerts with configurable reorder thresholds",
      "Supplier management with lead-time tracking",
      "Interactive Recharts dashboards (revenue, turnover, shrinkage)",
      "Role-based access control (admin / warehouse / read-only)",
      "CSV import/export for bulk SKU management",
      "Virtualized data tables (react-virtual) for 10k+ row catalogs",
    ],
    architecture:
      "Next.js App Router for server/client component splitting. MongoDB Atlas with compound indexes on (sku, warehouseId, updatedAt) for sub-50ms reads. SWR handles client-side cache invalidation with a 30s revalidation window. Tailwind + Radix UI primitives keep the design system consistent.",
    challenges: [
      "Rendering 10k+ rows without layout jank — solved with react-virtual windowing",
      "Keeping real-time state consistent across multiple browser tabs using BroadcastChannel",
      "Designing a flexible permission model that doesn't require schema migrations per tenant",
    ],
    optimizations: [
      "MongoDB compound indexes reduced average query time from 420ms → 140ms",
      "SWR deduplication cut redundant API calls by ~65% on the dashboard page",
      "Dynamic imports for Recharts reduced initial JS bundle by 38KB gzipped",
    ],
    uxDecisions: [
      "Sticky summary bar at the top so KPIs are always visible while scrolling the table",
      "Color-coded stock-status chips (green / amber / red) instead of raw numbers for instant scanning",
      "Inline editing in the table rather than a separate form page to reduce context switching",
    ],
    responsibilities: [
      "End-to-end frontend architecture (Next.js App Router, component library)",
      "MongoDB schema design and indexing strategy",
      "Real-time update pipeline (WebSocket → SWR mutation)",
      "Data visualization layer (Recharts, custom tooltips)",
      "Responsive design and accessibility audit",
    ],
  },

  {
    id: "spendwise",
    title: "SpendWise",
    tagline: "Expense Sharing Platform",
    description:
    "Real-time group expense splitter with receipt OCR, instant balance calculations, and interactive financial visualizations. Optimized transaction workflows and automated settlement tracking simplify collaborative expense management.",
    image: "/images/spendwise.png",
    tech: ["Next.js", "TypeScript", "Chart.js", "Drizzle ORM", "Tesseract.js"],
    metrics: {
    users: "Real-time group settlements",
    performance: "Instant balance calculations",
    },
    links: {
    github: "https://github.com/bhanurx100/SpendWise",
    live: "https://spend-wise-tawny.vercel.app/",
    },
    featured: true,

    overview:
    "SpendWise simplifies expense sharing for friend groups, travel teams, and collaborative activities. Users can create groups, add expenses, track balances, and automatically calculate optimized settlements with interactive analytics dashboards.",

    problem:
    "Managing shared expenses across multiple users becomes difficult as transactions increase. The challenge was designing a scalable system capable of minimizing settlement complexity while maintaining fast calculations and responsive real-time updates.",

    features: [
    "Debt simplification algorithm for optimized minimum-transfer settlements",
    "Receipt OCR integration using Tesseract.js for automatic expense extraction",
    "Interactive financial analytics with category-wise spending visualizations",
    "Real-time balance tracking with dynamic transaction synchronization",
    "CSV-ready transaction workflows and settlement summaries",
    "Responsive dashboards with reusable component architecture",
    "Multi-category expense management with instant calculations",
    ],

    architecture:
    "Built using Next.js, TypeScript, Drizzle ORM, and PostgreSQL-based workflows with modular frontend architecture and optimized state management. Financial calculations and settlement algorithms run efficiently on the client side for real-time user feedback.",

    challenges: [
    "Designing optimized balance settlement logic for multi-user expense groups",
    "Integrating OCR processing without affecting frontend responsiveness",
    "Maintaining efficient state synchronization across dynamic transaction workflows",
    ],

    optimizations: [
    "Memoized settlement calculations to reduce unnecessary recomputation",
    "Component-level rendering optimizations for smoother dashboard performance",
    "Modular architecture improving scalability and maintainability across features",
    ],

    uxDecisions: [
    "Color-coded financial indicators for quick balance interpretation",
    "Minimal-step settlement flows improving usability for group payments",
    "Interactive charts and animated financial summaries for better engagement",
    ],

    responsibilities: [
    "Frontend architecture and reusable UI system development",
    "Expense settlement algorithm implementation",
    "Database schema modeling using Drizzle ORM",
    "OCR workflow integration with Tesseract.js",
    "Financial dashboard visualization and analytics implementation",
    ],

    demoNote:
    "Live demo available — create groups, add expenses, and explore real-time settlement calculations and analytics dashboards.",

  },

  {
    id: "taskflow",
    title: "TaskFlow",
    tagline: "Kanban Project Management Tool",
    description:
      "Performant Trello-inspired Kanban board with dnd-kit drag-and-drop, nested sub-tasks, and PWA offline support. Optimized re-renders deliver 60fps on low-end devices.",
    image: "/images/taskflow.png",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "dnd-kit", "Zustand", "Workbox"],
    metrics: {
      performance: "60fps animations",
      users: "PWA offline-ready",
    },
    links: {
      github: "https://github.com/bhanurx100/taskflow-trello-clone",
      live: "#",
    },
    featured: true,

    overview:
      "TaskFlow is a keyboard-accessible, PWA-enabled Kanban board that supports nested subtasks, drag-and-drop between columns, and real-time persistence. Built as a deep-dive into performance-critical drag-and-drop UI patterns.",
    problem:
      "Most open-source Kanban implementations use deprecated libraries (react-beautiful-dnd) or sacrifice accessibility. The challenge was building a fully accessible drag-and-drop experience that stays at 60fps even on mid-range Android devices.",
    features: [
      "Smooth drag-and-drop across columns and within columns (dnd-kit)",
      "Nested subtask support with collapsible tree UI",
      "Keyboard-first drag-and-drop (fully accessible)",
      "PWA with Workbox service worker for offline CRUD",
      "Label, priority, and due-date filtering",
      "Zustand store with localStorage persistence",
      "Board and list view toggle",
    ],
    architecture:
      "React + TypeScript with Zustand for flat, normalized state (boards → columns → tasks). dnd-kit's sensor abstraction handles both pointer and keyboard events. Workbox generates a precaching service worker at build time for offline capability.",
    challenges: [
      "Preventing layout thrash during drag — used CSS transform instead of top/left positioning",
      "Nested subtask DnD without conflicting drag sensors — solved with dnd-kit's modifiers and custom collision detection",
      "Keeping 60fps on low-end Android — profiled and eliminated hidden layout triggers in the card component",
    ],
    optimizations: [
      "React.memo on card components cuts re-renders from O(n) to O(1) per drag event",
      "CSS contain: layout on column elements isolates repaint zones",
      "Virtualized column content (react-virtual) for boards with 200+ tasks",
    ],
    uxDecisions: [
      "Drag handle on card edge rather than full-card draggable to preserve clickability",
      "Ghost card placeholder shows exact drop position before release",
      "Undo toast for destructive actions (delete card, delete column)",
    ],
    responsibilities: [
      "Full frontend architecture (React + TypeScript)",
      "dnd-kit drag-and-drop implementation with keyboard accessibility",
      "Zustand state management and persistence layer",
      "PWA service worker setup (Workbox)",
      "Performance profiling and render optimization",
    ],
  },

  {
    id: "portfolio",
    title: "Personal Portfolio",
    tagline: "Developer Portfolio Website",
    description:
      "This portfolio — built with Next.js App Router, Framer Motion, GSAP, and Three.js. 98+ Lighthouse score, full accessibility compliance, command palette (⌘K), and a 3D interactive star background.",
    image: "/images/portfolio.png",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "TypeScript"],
    metrics: {
      performance: "98+ Lighthouse",
      users: "⌘K command palette",
    },
    links: {
      github: "https://github.com/bhanurx100/Bhanu-portfolio",
      live: "https://bhanu-portfolio-nine.vercel.app/",
    },
    featured: true,

    overview:
      "This very portfolio — designed as a showcase of advanced frontend engineering. Every interaction, animation, and layout decision is intentional, balancing visual richness with sub-2s load times and perfect accessibility scores.",
    problem:
      "Generic portfolio templates signal average engineering. The goal was to build something that immediately communicates frontend depth — smooth 3D backgrounds, command palette navigation, physics-based animations — while keeping Lighthouse Performance above 95.",
    features: [
      "Three.js star canvas with physics-based rotation",
      "Command palette (⌘K) with fuzzy search navigation",
      "GSAP ScrollTrigger for scroll-driven text reveals",
      "Framer Motion layout animations for section transitions",
      "Lenis smooth scrolling with reduced-motion fallback",
      "Floating dock navigation with macOS spring physics",
      "Contact form with Nodemailer backend and Zod validation",
    ],
    architecture:
      "Next.js 15 App Router with static export. Heavy client components (Three.js canvas, Framer Motion) are lazy-loaded via next/dynamic. GSAP plugins are async-imported to keep the critical path clean. Tailwind JIT + CSS variables for the design token layer.",
    challenges: [
      "Three.js canvas causing hydration mismatches — solved by mounting only client-side via useEffect",
      "Lenis + GSAP ScrollTrigger sync — required custom RAF loop linking both libraries",
      "Keeping 98+ Lighthouse while running Three.js — deferred canvas init until after LCP",
    ],
    optimizations: [
      "next/font eliminates FOUT and reduces layout shift to CLS < 0.01",
      "Dynamic imports for Three.js and GSAP shave 60KB from the initial bundle",
      "next/image with blur placeholders for all project screenshots",
    ],
    uxDecisions: [
      "Dark-only theme eliminates the flash-of-incorrect-theme problem entirely",
      "Progress nav dots on right rail give spatial awareness without consuming horizontal space",
      "Magnetic button effect on CTAs increases engagement without being distracting",
    ],
    responsibilities: [
      "End-to-end design and development",
      "Three.js scene setup and performance tuning",
      "Animation system (Framer Motion + GSAP + Lenis)",
      "Accessibility audit and WCAG AA compliance",
      "CI/CD pipeline and Vercel deployment configuration",
    ],
    demoNote: "You're looking at it right now.",
  },

  {
    id: "crypto-dashboard",
    title: "Crypto Dashboard",
    tagline: "Real-Time Market Data Dashboard",
    description:
      "Live crypto market dashboard polling CoinGecko at 5s intervals. SWR caching cut latency 70%. Portfolio tracker, interactive Recharts, and mobile-optimized layout for traders on the go.",
    image: "/images/crypto.png",
    tech: ["Next.js", "Tailwind CSS", "CoinGecko API", "SWR", "Recharts", "TypeScript"],
    metrics: {
      performance: "70% latency reduction",
      users: "Live 5s updates",
    },
    links: {
      github: "https://github.com/bhanurx100/crypto-dashboard",
      live: "https://crypto-dashboard-gamma-eight.vercel.app/",
    },
    featured: true,

    overview:
      "A real-time cryptocurrency market dashboard tracking 50+ assets with live price feeds, portfolio P&L tracking, and interactive candlestick/line charts — designed for traders who need data density without UI clutter.",
    problem:
      "Crypto traders juggle multiple tabs (CoinGecko, TradingView, portfolio trackers) to get a holistic market view. The goal was to consolidate the most-needed data into a single, fast, mobile-friendly dashboard.",
    features: [
      "5-second polling with SWR deduplication and stale-while-revalidate",
      "Portfolio tracker with unrealized P&L calculations",
      "Interactive Recharts (candlestick, area, volume bars)",
      "Top gainers/losers widget with 24h sparklines",
      "Market cap dominance donut chart",
      "Search and watchlist with localStorage persistence",
      "Dark/light theme with system preference detection",
    ],
    architecture:
      "Next.js App Router with SWR for all data fetching. CoinGecko free-tier API calls are batched (up to 250 ids per request) to stay within rate limits. Recharts components are lazy-loaded to keep the initial bundle lean. Chart data is memoized to prevent unnecessary re-renders on 5s polling ticks.",
    challenges: [
      "CoinGecko rate limits (10–30 req/min on free tier) — solved by batching and caching aggressively with SWR",
      "Recharts re-rendering entire chart on every poll tick — fixed by memoizing data transformation functions",
      "Number formatting consistency across locales — abstracted into a single Intl.NumberFormat utility",
    ],
    optimizations: [
      "SWR's deduplication + stale-while-revalidate pattern keeps UI responsive during API calls",
      "Chart data memoization reduced Recharts re-renders by ~80% during polling cycles",
      "Lazy-loaded chart components save 45KB gzipped on initial page load",
    ],
    uxDecisions: [
      "Price change color flash (green pulse / red pulse) on update for instant attention signaling",
      "Compact table view with expandable detail panel avoids overwhelming users with all data at once",
      "Sticky header with portfolio summary so P&L is always visible while scrolling the coin list",
    ],
    responsibilities: [
      "Full frontend architecture (Next.js, TypeScript)",
      "CoinGecko API integration and rate-limit management",
      "SWR data-fetching layer with polling strategy",
      "Recharts visualization components",
      "Portfolio tracking logic and localStorage persistence",
    ],
    demoNote: "Live demo uses CoinGecko free tier — prices update every 5 seconds.",
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getRegularProjects = () => projects.filter((p) => !p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);