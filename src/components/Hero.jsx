"use client"

import { Canvas } from '@react-three/fiber';
import React from 'react'
import Experience from './Experience';

const Hero = () => {
  return (
    <div className="relative">
      <Canvas shadows className="absolute left-[0] top-[0] v-[100vw] z-[5]">
        <Experience />
      </Canvas>
    </div>
  );
}

export default Hero