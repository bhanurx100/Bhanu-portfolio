"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import StarBackground from "./StarBackground";

const StarCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[0]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarCanvas;