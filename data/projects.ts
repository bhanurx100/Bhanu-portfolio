import { Project } from '@/components/ui/ProjectCard';

export const projects: Project[] = [
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    tagline: 'Personal Expense Tracking App',
    description:
      'A personal expense tracking application that helps users record, categorize, and visualize their spending. Includes charts to analyze expenses and improve budgeting habits.',
    image: '/images/1.png',
    tech: ['React.js', 'JavaScript', 'Chart.js', 'CSS'],
    metrics: {
      users: 'Expense visualization',
    },
    links: {
      github: 'https://github.com/bhanurx100/SpendWise.git',
      live: 'https://spend-wise-tawny.vercel.app/',
    },
    featured: true,
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    tagline: 'Task Management System',
    description:
      'A drag-and-drop task management board designed to organize work efficiently. Built with a clean UI and smooth interactions for better productivity.',
    image: '/images/2.png',
    tech: ['React.js', 'Tailwind CSS', 'dnd-kit'],
    metrics: {
      users: 'Task organization',
    },
    links: {
      github: 'https://github.com/bhanurx100/kanban',
      live: 'https://kanban-mu-peach.vercel.app/',
    },
    featured: true,
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    tagline: 'Developer Portfolio Website',
    description:
      'A responsive personal portfolio website showcasing projects, skills, and experience. Designed with modern UI patterns and smooth animations.',
    image: '/images/3.png',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: {
      users: 'Responsive design',
    },
    links: {
      github: 'https://github.com/bhanurx100/Bhanu-portfolio',
      live: 'https://bhanu-portfolio-nine.vercel.app/',
    },
  },
];

/* ========= HELPERS ========= */

export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);

export const getRegularProjects = () =>
  projects.filter((project) => !project.featured);

export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);
