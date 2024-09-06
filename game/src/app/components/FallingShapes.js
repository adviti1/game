"use client";

import { useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Sphere, Cone } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid'; // For unique keys

// FallingShape component handles rendering of individual shapes
const FallingShape = ({ position, shapeType }) => {
  return (
    <RigidBody type="dynamic" position={position}>
      {shapeType === 'box' && <Box args={[1, 1, 1]} />}
      {shapeType === 'sphere' && <Sphere args={[1]} />}
      {shapeType === 'cone' && <Cone args={[1, 2]} />}
    </RigidBody>
  );
};

const FallingShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;
      const shapeType = Math.random() < 0.33 ? 'box' : Math.random() < 0.66 ? 'sphere' : 'cone';

      // Add a new shape to the shapes array
      setShapes((prevShapes) => [
        ...prevShapes,
        { id: uuidv4(), position: [x, 10, z], shapeType },
      ]);
    }, 7000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <>
      {shapes.map(({ id, position, shapeType }) => (
        <FallingShape key={id} position={position} shapeType={shapeType} />
      ))}
    </>
  );
};

export default FallingShapes;
