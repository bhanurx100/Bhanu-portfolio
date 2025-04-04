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
      <section className="text-white relative z-10 py-16 min-h-[70vh] sm:min-h-[80vh]" id="about">
        <div className="text-center px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-8 drop-shadow-lg"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={slideInFromRight(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base lg:text-lg max-w-3xl mx-auto drop-shadow-md leading-relaxed sm:leading-loose"
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

      <section className="text-green-800 relative z-10 py-12">
        <div className="text-center px-6 sm:px-8 lg:px-12">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-8 drop-shadow-lg"
          >
            Skills
          </motion.h2>
        </div>
      </section>

      <section className="text-white relative z-10 py-12">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-x-6 gap-y-10 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
          {Skill_data.map((skill, index) => {
            const className = skillsToTint.includes(skill.skill_name)
              ? "opacity-90 hover:opacity-100 transition-opacity blue-tint"
              : "opacity-90 hover:opacity-100 transition-opacity";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-center items-center"
              >
                <Image
                  src={skill.Image}
                  alt={skill.skill_name}
                  width={32}
                  height={32}
                  className={`${className} w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12`}
                />
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutSection;