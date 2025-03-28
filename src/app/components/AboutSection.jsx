"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";
import { Skill_data } from "../constants";

// Function to generate positions in a reverse triangle pattern with a 5-4-3-2-2 structure
const generateReverseTrianglePositions = (numItems) => {
  const positions = [];
  const structure = [5, 4, 3, 2, 2]; // Define the number of items per row (5-4-3-2-2)
  const rows = structure.length; // Number of rows
  let itemsPlaced = 0;

  // Minimum spacing between items to prevent overlap (in percentage)
  const minSpacing = 4; // Reduced spacing for a more compact triangle

  for (let row = 0; row < rows && itemsPlaced < numItems; row++) {
    const itemsInRow = structure[row]; // Number of items in the current row
    const rowWidth = itemsInRow * 8; // Reduced multiplier for tighter spacing

    // Calculate the starting left position to center the row
    const startLeft = (100 - rowWidth) / 2; // Center the row horizontally

    // Calculate the top position for this row
    const top = (row / (rows - 1)) * 60 + 20; // Adjusted vertical spread for compactness

    for (let col = 0; col < itemsInRow && itemsPlaced < numItems; col++) {
      // Calculate the left position for each item in the row
      const left = itemsInRow === 1 ? 50 : startLeft + (col * rowWidth) / (itemsInRow - 1); // Center if only one item in the row

      // Check for overlap with previously placed items and adjust if necessary
      let adjustedLeft = left;
      let adjustedTop = top;
      let overlap = true;
      let attempts = 0;
      const maxAttempts = 10;

      while (overlap && attempts < maxAttempts) {
        overlap = false;
        for (const pos of positions) {
          const dx = Math.abs(parseFloat(pos.left) - adjustedLeft);
          const dy = Math.abs(parseFloat(pos.top) - adjustedTop);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minSpacing) {
            overlap = true;
            adjustedLeft += minSpacing / 2; // Nudge the position to the right
            adjustedTop += minSpacing / 4; // Nudge the position down slightly
            break;
          }
        }
        attempts++;
      }

      // Ensure the adjusted positions are within bounds (0% to 100%)
      adjustedLeft = Math.max(5, Math.min(95, adjustedLeft));
      adjustedTop = Math.max(5, Math.min(95, adjustedTop));

      positions.push({ top: `${adjustedTop}%`, left: `${adjustedLeft}%` });
      itemsPlaced++;
    }
  }

  // Ensure all items are placed, even if the loop doesn't cover all items
  while (itemsPlaced < numItems) {
    // Place remaining items in a fallback position, ensuring they are visible
    const top = 50;
    const left = 50 + (itemsPlaced - structure.reduce((a, b) => a + b, 0)) * 10;

    positions.push({ top: `${top}%`, left: `${left}%` });
    itemsPlaced++;
  }

  return positions;
};

// Generate positions for the skills in a reverse triangle
const skillPositions = generateReverseTrianglePositions(Skill_data.length);

const AboutSection = () => {
  return (
    <>
      {/* About Me Section */}
      <section className="text-white relative z-10" id="about">
        <div className="text-center py-16 px-4">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={slideInFromRight(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base lg:text-lg max-w-2xl mx-auto"
          >
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with Python, JavaScript, SQL, HTML, CSS, React.js, Tailwind
            CSS, Next.js, Chart.js, and Firebase. I am a quick learner and I am
            always looking to expand my knowledge and skill set. I am a team
            player and I am excited to work with others to create amazing
            applications.
          </motion.p>
        </div>
      </section>

      {/* Gap Between Sections */}
      <div className="h-20"></div>

      {/* Skills Section */}
      <section className="text-white relative z-10">
        <div className="relative h-[600px] w-full">
          {Skill_data.map((skill, index) => {
            // Fallback in case skillPositions[index] is undefined
            const position = skillPositions[index] || { top: "50%", left: "50%" };

            return (
              <div
                key={index}
                className="floating-skill"
                style={{
                  top: position.top,
                  left: position.left,
                }}
              >
                <Image
                  src={skill.Image}
                  alt={skill.skill_name}
                  width={40} // Reduced size to match the original compactness
                  height={40}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutSection;