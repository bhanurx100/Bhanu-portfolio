import { Project } from "@/components/ui/ProjectCard";

export const projects: Project[] = [
  {
    id: "stockpilot",
    title: "StockPilot",
    tagline: "Inventory Management SaaS Dashboard",
    description:
      "Engineered a scalable SaaS inventory management dashboard that empowers businesses to monitor stock in real-time, automate reordering, and gain actionable insights via interactive charts. Achieved 3x faster query performance with optimized MongoDB indexing and virtualized tables for 10k+ item catalogs.",
    image: "/images/stockpilot.png",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    metrics: {
      performance: "3x faster queries",
      scale: "10k+ items handled smoothly",
    },
    links: {
      github: "https://github.com/bhanurx100/stockpilot-inventory-saas",
      live: "#",
    },
    featured: true,
  },

  {
    id: "stayease",
    title: "StayEase",
    tagline: "Hotel Booking Platform",
    description:
      "Launched a robust hotel booking platform with intelligent search, real-time availability checks, and secure reservation flows. Integrated geolocation filtering and payment gateways, delivering 95% booking completion rates through intuitive UI/UX design.",
    image: "/images/stayease.png",
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    metrics: {
      performance: "95% booking completion",
      users: "Real-time geo-search",
    },
    links: {
      github: "https://github.com/bhanurx100/stayease-hotel-booking-platform",
      live: "#",
    },
    featured: true,
  },

  {
    id: "spendwise",
    title: "SpendWise",
    tagline: "Expense Sharing Platform",
    description:
      "Created SpendWise, a real-time expense splitter for groups with instant balance calculations, receipt OCR, and dynamic Chart.js visualizations. Firebase sync supports unlimited splits, saving users hours on settlements.",
    image: "/images/spendwise.png",
    tech: ["React.js", "JavaScript", "Chart.js", "Firebase"],
    metrics: {
      users: "Real-time group splits",
      performance: "Instant calculations",
    },
    links: {
      github: "https://github.com/bhanurx100/SpendWise",
      live: "https://spend-wise-tawny.vercel.app/",
    },
    featured: true,
  },

  {
    id: "taskflow",
    title: "TaskFlow",
    tagline: "Kanban Project Management Tool (Trello Clone)",
    description:
      "Engineered TaskFlow, a performant Trello clone with buttery-smooth dnd-kit drag-drop, nested sub-tasks, and PWA offline support. Optimized re-renders deliver 60fps on low-end devices for seamless team collaboration.",
    image: "/images/taskflow.png",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "dnd-kit"],
    metrics: {
      performance: "60fps animations",
      users: "Nested task support",
    },
    links: {
      github: "https://github.com/bhanurx100/taskflow-trello-clone",
      live: "#",
    },
    featured: true,
  },

  {
    id: "portfolio",
    title: "Personal Portfolio",
    tagline: "Developer Portfolio Website",
    description:
      "Architected this cutting-edge portfolio featuring 3D hover effects, infinite scroll animations, and AI-powered command palette. Scored 98+ Lighthouse with Next.js App Router and full accessibility compliance.",
    image: "/images/portfolio.png",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    metrics: {
      performance: "98+ Lighthouse",
      users: "AI command palette",
    },
    links: {
      github: "https://github.com/bhanurx100/Bhanu-portfolio",
      live: "https://bhanu-portfolio-nine.vercel.app/",
    },
    featured: true,
  },

  {
    id: "crypto-dashboard",
    title: "Crypto Dashboard",
    tagline: "Real-Time Market Data Dashboard",
    description:
      "Powered a live crypto dashboard with CoinGecko API polling at 5s intervals, portfolio tracking, and interactive Recharts. Reduced latency 70% via SWR caching, providing traders with mobile-optimized insights 24/7.",
    image: "/images/crypto.png",
    tech: ["Next.js", "Tailwind CSS", "CoinGecko API"],
    metrics: {
      performance: "70% latency reduction",
      users: "Live 5s updates",
    },
    links: {
      github: "https://github.com/bhanurx100/crypto-dashboard",
      live: "https://crypto-dashboard-gamma-eight.vercel.app/",
    },
    featured: true,
  },
];

/* ========= HELPERS ========= */

export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);

export const getRegularProjects = () =>
  projects.filter((project) => !project.featured);

export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);
