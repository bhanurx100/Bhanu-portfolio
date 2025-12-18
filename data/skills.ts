export interface Skill {
  id: string;
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent';
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

type BaseSkill = Omit<Skill, 'color'>;

const baseSkills: BaseSkill[] = [
  // ================= FRONTEND =================
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'nextjs', label: 'Next.js', category: 'frontend' },
  { id: 'typescript', label: 'TypeScript', category: 'frontend' },
  { id: 'javascript', label: 'JavaScript', category: 'frontend' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend' },
  { id: 'shadcn', label: 'shadcn/ui', category: 'frontend' },
  { id: 'framer', label: 'Framer Motion', category: 'frontend' },
  { id: 'html', label: 'HTML5', category: 'frontend' },
  { id: 'css', label: 'CSS3', category: 'frontend' },
  { id: 'threejs', label: 'Three.js', category: 'frontend' },

  // ================= BACKEND =================
  { id: 'nodejs', label: 'Node.js', category: 'backend' },
  { id: 'express', label: 'Express', category: 'backend' },
  { id: 'python', label: 'Python', category: 'backend' },
  { id: 'sql', label: 'SQL', category: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'backend' },
  { id: 'mongodb', label: 'MongoDB', category: 'backend' },
  { id: 'prisma', label: 'Prisma', category: 'backend' },
  { id: 'graphql', label: 'GraphQL', category: 'backend' },
  { id: 'rest', label: 'REST API', category: 'backend' },

  // ================= TOOLS =================
  { id: 'git', label: 'Git', category: 'tools' },
  { id: 'github', label: 'GitHub', category: 'tools' },
  { id: 'docker', label: 'Docker', category: 'tools' },
  { id: 'vercel', label: 'Vercel', category: 'tools' },
  { id: 'vscode', label: 'VS Code', category: 'tools' },
  { id: 'webpack', label: 'Webpack', category: 'tools' },
  { id: 'vite', label: 'Vite', category: 'tools' },

  // ================= DESIGN =================
  { id: 'figma', label: 'Figma', category: 'design' },
  { id: 'responsive', label: 'Responsive Design', category: 'design' },
  { id: 'ui-ux', label: 'UI/UX', category: 'design' },
];

const colorCycle: Exclude<Skill['color'], undefined>[] = [
  'primary',
  'accent',
  'secondary',
  'default',
];

const applyAlternatingColors = (list: BaseSkill[]): Skill[] =>
  list.map((skill, index) => ({
    ...skill,
    color: colorCycle[index % colorCycle.length],
  }));

export const skills: Skill[] = applyAlternatingColors(baseSkills);

// Skills by category (used in sections)
export const getSkillsByCategory = (category: Skill['category']) => {
  const filtered = baseSkills.filter((skill) => skill.category === category);
  return applyAlternatingColors(filtered);
};

// All skills (used for marquee / scrolling row)
export const getMarqueeSkills = () => {
  return skills;
};
