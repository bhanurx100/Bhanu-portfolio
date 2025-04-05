"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "SpendWise",
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
    gitUrl: "https://github.com/bhanurx100/kanban",
    previewUrl: "https://kanban-inrmdnnns-bhanurx100s-projects.vercel.app",
  },
  {
    id: 3,
    title: "Portfolio ",
    description: "A dynamic portfolio generator allowing users to customize and showcase their profiles. Features live preview and Firebase for storage and hosting, improving user experience by 30%.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/bhanurx100/Bhanu-portfolio",
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

  return (
    <section id="projects" className="py-24 container mx-auto px-6 sm:px-8 lg:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mt-4 mb-8 md:mb-12 drop-shadow-lg"
      >
        My Projects
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-white flex flex-row justify-center items-center gap-2 py-6"
      >
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
      </motion.div>
      <div ref={ref} className="flex flex-col gap-12 max-w-2xl mx-auto">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${
              index === 0
                ? "w-full sm:w-[90%] lg:w-[90%]"
                : index === 1
                ? "w-full sm:w-[90%] lg:w-[90%]"
                : "w-full sm:w-[90%] lg:w-[90%]"
            } mx-auto`}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;