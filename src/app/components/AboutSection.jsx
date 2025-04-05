"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";
import { Skill_data } from "../constants";

const AboutSection = () => {
  const skillsToTint = ["Express js", "Shadcn"];

  return (
    <>
      {/* About Me Section */}
      <section className="text-white py-10" id="about">
        <div className="text-center px-4 sm:px-6">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-6"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={slideInFromRight(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Aspiring full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with Python, JavaScript, SQL, React.js, Tailwind CSS,
            Next.js, and Firebase. I am a quick learner and I am always looking
            to expand my knowledge and skill set. I am a team player and I am
            excited to work with others to create amazing applications.
          </motion.p>
        </div>
      </section>

      {/* Skills Heading */}
      <section className="text-green-800 py-10">
        <div className="text-center px-4">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Skills
          </motion.h2>
        </div>
      </section>

      {/* Skills Logo Layout */}
      <section className="py-10 px-4 sm:px-6 flex justify-center">
        <div className="max-w-[900px] w-full">
          {/* Reverse Pyramid for laptop/tablet (md and up) */}
          <div className="hidden md:flex md:flex-col md:items-center md:justify-center">
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 w-full">
              {Skill_data.slice(0, 7).map((skill, index) => renderSkill(skill, index, 0, "w-[70px] h-[70px]"))}
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 w-[90%] md:w-[80%] lg:w-[70%]">
              {Skill_data.slice(7, 12).map((skill, index) => renderSkill(skill, index + 7, 1, "w-[70px] h-[70px]"))}
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 w-[70%] md:w-[60%] lg:w-[50%]">
              {Skill_data.slice(12, 15).map((skill, index) => renderSkill(skill, index + 12, 2, "w-[70px] h-[70px]"))}
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 w-[50%] md:w-[40%] lg:w-[30%]">
              {Skill_data.slice(15, 17).map((skill, index) => renderSkill(skill, index + 15, 3, "w-[70px] h-[70px]"))}
            </div>
          </div>

          {/* Grid for mobile (below md) */}
          <div className="md:hidden flex flex-wrap gap-2 justify-center">
            {Skill_data.map((skill, index) => renderSkill(skill, index, 0, "w-[50px] h-[50px]"))}
          </div>
        </div>
      </section>
    </>
  );
};

// Helper function to render skill logo
const renderSkill = (skill, index, rowIndex, logoSize) => {
  const isTinted = ["Express js", "Shadcn"].includes(skill.skill_name);
  // Adjust MongoDB logo size to ensure it fits well with object-contain
  const adjustedLogoSize = skill.skill_name === "MongoDB" ? "w-[25px] h-[25px]" : logoSize;
  const width = parseInt(adjustedLogoSize.split(" ")[0].replace("w-[", "").replace("px]", ""));
  const height = parseInt(adjustedLogoSize.split(" ")[1].replace("h-[", "").replace("px]", ""));
  // Use object-contain for all logos to ensure full visibility
  const imageClass = "object-contain";

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: rowIndex * 0.1 + (index % 7) * 0.1 }}
      className={`bg-gray-800 bg-opacity-70 rounded-lg p-2 shadow-lg flex justify-center items-center overflow-hidden ${adjustedLogoSize}`}
    >
      <Image
        src={skill.Image}
        alt={skill.skill_name}
        width={width}
        height={height}
        className={`${imageClass} opacity-90 hover:opacity-100 transition-opacity`}
      />
    </motion.div>
  );
};

export default AboutSection;