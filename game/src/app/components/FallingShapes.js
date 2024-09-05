"use client";

import { useEffect } from 'react';
import { useRapier, useRigidBody } from '@react-three/rapier';
import { Box, Sphere, Cone } from '@react-three/drei';

const FallingShape = ({ position }) => {
  const { world } = useRapier();
  const [ref] = useRigidBody({
    type: 'dynamic',
    position,
  });

  return (
    <group ref={ref}>
      <Box args={[1, 1, 1]} />
    </group>
  );
};

const FallingShapes = () => {
  const { world } = useRapier();

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;
      const shape = Math.random();
      const shapeType = shape < 0.33 ? 'box' : shape < 0.66 ? 'sphere' : 'cone';
      
      if (shapeType === 'box') {
        <FallingShape position={[x, 10, z]} />
      } else if (shapeType === 'sphere') {
        <Sphere args={[1]} position={[x, 10, z]} />
      } else {
        <Cone args={[1, 2]} position={[x, 10, z]} />
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [world]);

  return null;
};

export default FallingShapes;
