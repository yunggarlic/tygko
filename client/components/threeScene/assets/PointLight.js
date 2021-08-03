import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const PointLight = () => {
  return <pointLight args={['#800808', 10]} />;
};

export default PointLight;
