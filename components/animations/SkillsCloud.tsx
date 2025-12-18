'use client';

import { useEffect, useState } from 'react';
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';

import {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siRedux,
  siNodedotjs,
  siExpress,
  siMongodb,
  siTailwindcss,
  siFirebase,
  siFramer,
} from 'simple-icons';

const ICONS = [
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siRedux,
  siNodedotjs,
  siExpress,
  siMongodb,
  siTailwindcss,
  siFirebase,
  siFramer,
];

export default function SkillsCloud() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full">
      <Cloud
        options={{
          noMouse: true,
          pinchZoom: false,
          maxSpeed: 0.02,
          initial: [0.8, -0.3],
        }}
      >
        {ICONS.map((icon) =>
          renderSimpleIcon({
            icon,
            size: 110,
            aProps: {
              onClick: (e) => e.preventDefault(),
            },
          })
        )}
      </Cloud>
    </div>
  );
}
