"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Cylinder, Box } from '@react-three/drei';

const Vehicle = () => {
  const vehicleRef = useRef();
  const { mouse } = useThree(); 
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'W') setIsMovingForward(true);
      if (event.key === 'S') setIsMovingBackward(true);
    };
    
    const handleKeyUp = (event) => {
      if (event.key === 'W') setIsMovingForward(false);
      if (event.key === 'S') setIsMovingBackward(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  
  useFrame(() => {
    if (vehicleRef.current) {
      if (isMovingForward) {
        vehicleRef.current.position.z -= 0.1;
      }
      if (isMovingBackward) {
        vehicleRef.current.position.z += 0.1;
      }

      vehicleRef.current.rotation.y = mouse.x * Math.PI;
    }
  });

  return (
    <group ref={vehicleRef}>
      <Box args={[2, 0.5, 1]} position={[0, 0.5, 0]} />
      <Sphere args={[0.3]} position={[0, 0.2, 1]} />
      <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[-1, 0.2, -1]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[1, 0.2, -1]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
};

export default Vehicle;
