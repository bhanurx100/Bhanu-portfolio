import React from "react";
import { Cloud, renderSimpleIcon } from "react-icon-cloud";
import {
  siHtml5,
  siCss3,
  siPython,
  siMysql,
  siJavascript,
  siTypescript,
  siReact,
  siRedux,
  siNextdotjs,
  siMongodb,
  siNodedotjs,
  siExpress,
  siTailwindcss,
  siFirebase,
  siMaterialdesign,
  siFramer,
} from "simple-icons/icons";

const skillIcons = [
  { skill_name: "Html 5", icon: siHtml5 },
  { skill_name: "Css", icon: siCss3 },
  { skill_name: "Python", icon: siPython },
  { skill_name: "SQL", icon: siMysql },
  { skill_name: "Java Script", icon: siJavascript },
  { skill_name: "Type Script", icon: siTypescript },
  { skill_name: "React", icon: siReact },
  { skill_name: "Redux", icon: siRedux },
  { skill_name: "Next js", icon: siNextdotjs },
  { skill_name: "Mongo db", icon: siMongodb },
  { skill_name: "Node js", icon: siNodedotjs },
  { skill_name: "Express js", icon: siExpress },
  { skill_name: "Tailwind Css", icon: siTailwindcss },
  { skill_name: "Firebase", icon: siFirebase },
  { skill_name: "Material UI", icon: siMaterialdesign },
  { skill_name: "Framer Motion", icon: siFramer },
]
  .filter(({ icon }) => icon !== undefined)
  .map(({ skill_name, icon }) => {
    return renderSimpleIcon({
      icon,
      size: 120, // Increased from 100 to 120
      aProps: {
        onClick: (e) => e.preventDefault(),
      },
    });
  });

const SkillsCloud = () => {
  const options = {
    noMouse: true,
    pinchZoom: true,
    maxSpeed: 0.02,
    initial: [0.8, -0.3],
  };

  return (
    <div className="CloudTag">
      <Cloud options={options}>{skillIcons}</Cloud>
    </div>
  );
};

export default SkillsCloud;