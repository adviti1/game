"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three'; 
import { OrbitControls } from '@react-three/drei';

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
    <directionalLight position={[0,0,5]}/>
    <OrbitControls/>
      <Box args={[1, 0.5, 0.5]} position={[0, 0.2, -0.5]} material-color="grey"/>
      <Box args={[1, 0.4, 1]} material-color="grey"/>
      <Sphere args={[0.25]} position={[0, -0.2, 0.6]} material-color="brown" />
      <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[-0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey"/>
      <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey"/>
      </group>
    // </RigidBody>
  );
};

export default Vehicle;
