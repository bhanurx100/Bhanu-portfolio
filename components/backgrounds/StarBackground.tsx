'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function StarBackground() {
  const ref = useRef<THREE.Points>(null);

  // ✅ SAFE star generation (NO NaN POSSIBLE)
  const positions = useMemo(() => {
    const count = 1500; // number of stars
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 3;
    }

    return array;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.x -= delta * 0.05;
    ref.current.rotation.y -= delta * 0.03;

    ref.current.position.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    ref.current.position.y =
      Math.cos(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
