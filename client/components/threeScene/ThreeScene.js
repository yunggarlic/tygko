import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Cube from './assets/Cube';

const ThreeScene = () => {
  return (
    <div className="scene">
      <Canvas>
        <ambientLight />
        <Cube />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
