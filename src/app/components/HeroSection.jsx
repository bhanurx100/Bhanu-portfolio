"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const SkillsCloud = dynamic(() => import("./SkillsCloud"), { ssr: false });

const HeroSection = () => {
  return (
    <section className="relative py-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-12 relative z-20 container mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 gap-2 sm:gap-4 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-7xl lg:leading-normal font-extrabold drop-shadow-lg">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500">
              Hello, I'm{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={["Bhanuprasad L", 1000, "Web Developer", 1000, "Software Engineer", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-blue-500"
            />
          </h1>
          <p className="text-[#ADB7BE] text-sm sm:text-base lg:text-lg max-w-xl mx-auto sm:mx-0 drop-shadow-md">
            Aspiring software developer with strong skills in web development,
            seeking opportunities to apply my knowledge and grow in a dynamic
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mt-4">
            <Link
              href="/#contact"
              className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>
            <Link
              href="https://drive.google.com/file/d/1TU5El3kiAapGvKt0uSpnFQ7gM-7o-aMb/view?usp=sharing"
              className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] relative flex items-center justify-center lg:mr-8">
            <SkillsCloud />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;