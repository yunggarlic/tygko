import React, { useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';

const Cube = () => {
  const ref = useRef();
  const { scale } = useSpring({
    config: { mass: 5, tension: 5, friction: 5, precision: 0.0001 },
    loop: { reverse: true },
    from: { scale: 5 },
    to: { scale: 0.75 },
  });

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.005;
  });

  return (
    <a.mesh ref={ref} scale-x={scale} scale-y={scale} scale-z={scale}>
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshBasicMaterial wireframe />
    </a.mesh>
  );
};

export default Cube;
