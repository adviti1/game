"use client";

import { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';


extend({ PlaneGeometry: THREE.PlaneGeometry });

const Vehicle = () => {
  const vehicleRef = useRef();
  const { mouse, viewport } = useThree();
  const targetPosition = new THREE.Vector3(); 

  useFrame(() => {
    if (vehicleRef.current) {
      
       targetPosition.set(
       mouse.x * viewport.width / 2,
        vehicleRef.current.position.y, 
        -mouse.y * viewport.height / 2,
      );

      
      vehicleRef.current.position.lerp(targetPosition, 0.05); 
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <group ref={vehicleRef}>
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Box args={[1, 0.5, 0.5]} position={[0, 0.2, -0.5]} material-color="black" />
        <Box args={[1, 0.4, 1]} material-color="black" />
        <Sphere args={[0.25]} position={[0, -0.2, 0.6]} material-color="grey" />
        <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[-0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey" />
        <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey" />
      </group>
    </>
  );
};

export default Vehicle;
