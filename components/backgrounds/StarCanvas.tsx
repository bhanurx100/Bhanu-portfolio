'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StarBackground from './StarBackground';

export default function StarCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
