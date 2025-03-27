"use client";
import React, { useState } from "react";
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Python</li>
        <li>JavaScript</li>
        <li>SQL</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>React.js</li>
        <li>Tailwind CSS</li>
        <li>Next.js</li>
        <li>Chart.js</li>
        <li>Firebase</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} alt="About Image" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with Python, JavaScript, SQL, HTML, CSS, React.js, Tailwind CSS, Next.js, Chart.js, and Firebase. 
            I am a quick learner and I am always looking to expand my knowledge and skill set. 
            I am a team player and I am excited to work with others to create amazing applications.
          </p>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;