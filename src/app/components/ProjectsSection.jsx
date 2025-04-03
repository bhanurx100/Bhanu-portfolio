"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Spendwise",
    description: "A comprehensive, user-centric expense tracking platform with meticulous precision, boosting data accuracy by 25%. Visualized financial trends using Chart.js, enhancing analysis by 30%.",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bhanurx100/SpendWise.git",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Kanban",
    description: "A dynamic task management platform with React.js, boosting team productivity by 35%. Features intuitive UI with Tailwind CSS and secure authentication with Google OAuth 2.0 and JWT.",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bhanurx100",
    previewUrl: "https://kanban-inrmdnnns-bhanurx100s-projects.vercel.app",
  },
  {
    id: 3,
    title: "Portfolio Builder",
    description: "A dynamic portfolio generator allowing users to customize and showcase their profiles. Features live preview and Firebase for storage and hosting, improving user experience by 30%.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bhanurx100",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-24">
      <h2 className="text-center text-4xl font-bold text-green-800 mt-4 mb-8 md:mb-12 drop-shadow-lg">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
      </div>
      <ul ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;