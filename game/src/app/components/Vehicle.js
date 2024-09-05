"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three'; 

const Vehicle = () => {
  const vehicleRef = useRef();
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
      const force = isMovingForward 
        ? new THREE.Vector3(0, 0, -10) 
        : isMovingBackward 
        ? new THREE.Vector3(0, 0, 10) 
        : new THREE.Vector3(0, 0, 0);

      vehicleRef.current.applyImpulse(force);
    }
  });

  return (
    // <RigidBody ref={vehicleRef} position={[0, 1, 0]} type="dynamic">
    <group>
      <Box args={[2, 0.5, 1]} />
      <Sphere args={[0.3]} position={[0, 0.2, 1]} />
      <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[-1, 0.2, -1]} />
      <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[1, 0.2, -1]} />
      </group>
    // </RigidBody>
  );
};

export default Vehicle;
