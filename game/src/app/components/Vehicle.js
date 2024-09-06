"use client";

import { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

extend({ PlaneGeometry: THREE.PlaneGeometry });

const Vehicle = () => {
  const vehicleRef = useRef();
  const { mouse, viewport} = useThree();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); 

  const stageBoundaries = {
    left: -viewport.width / 2 + 1,
    right: viewport.width / 2 - 1,
    top: -viewport.height / 2 + 1,
    bottom: viewport.height / 2 - 1,
  };

 
  useFrame(() => {
    if (vehicleRef.current) {
      let newX = mouse.x * viewport.width / 2;
      let newZ = mouse.y * viewport.height / 2;

      if (newX < stageBoundaries.left) newX = stageBoundaries.left;
      if (newX > stageBoundaries.right) newX = stageBoundaries.right;
      if (newZ < stageBoundaries.top) newZ = stageBoundaries.top;
      if (newZ > stageBoundaries.bottom) newZ = stageBoundaries.bottom;

      vehicleRef.current.position.x = newX;
      vehicleRef.current.position.z = newZ;
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
    <OrbitControls/>
      <Box args={[1, 0.5, 0.5]} position={[0, 0.2, -0.5]} material-color ={["red"]} />
      <Box args={[1, 0.4, 1]} material-color={["black"]}/>
      <Sphere args={[0.25]} position={[0, -0.2, 0.6]} material-color="grey" />
      <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[-0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey"/>
      <Cylinder args={[0.2, 0.2, 0.1, 16]} position={[0.5, -0.2, -0.6]} rotation={[Math.PI / 2, 0, 4.7]} material-color="grey"/>
      </group>

    </>
  );
};

export default Vehicle;
