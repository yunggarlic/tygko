import React from 'react';
import Cube from './Cube';
import PointLight from './PointLight';

const GlowCube = () => {
  return (
    <Cube>
      <PointLight />
    </Cube>
  );
};

export default GlowCube;
