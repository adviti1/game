"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

extend({ PlaneGeometry: THREE.PlaneGeometry });

const Vehicle = () => {
  const vehicleRef = useRef();
  const { mouse, viewport } = useThree();
  const [isMoving, setIsMoving] = useState(false); // Track if the vehicle is moving manually
  const [rotation, setRotation] = useState(0); // Track the rotation for 180-degree turns

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") {
        setIsMoving(true); // Start moving the vehicle when W is pressed
      } else if (event.key === "s") {
        setRotation((prevRotation) => prevRotation + Math.PI); // 180-degree turn on S key press
        setIsMoving(true); // Consider this as manual control
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "w") {
        setIsMoving(false); // Stop moving the vehicle when W is released
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (vehicleRef.current) {
      // Update position manually if the vehicle is moving
      if (isMoving) {
        const moveBackward = new THREE.Vector3(0, 0, -0.05); // Move backward by a small increment
        vehicleRef.current.position.add(moveBackward);
      } else {
        // Only lerp to the mouse target when the vehicle is not manually moving
        const targetPosition = new THREE.Vector3(
          mouse.x * viewport.width * 4,
          vehicleRef.current.position.y,
          -mouse.y * viewport.height * 4
        );
        vehicleRef.current.position.lerp(targetPosition, 0.1);
      }

      // Apply rotation change for 180-degree turns
      vehicleRef.current.rotation.y = rotation;
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
        <Box args={[1, 0.5, 0.5]} position={[0, 0.2, -0.5]} material-color="red" />
        <Box args={[1, 0.4, 1]} material-color="black" />
        <Sphere args={[0.25]} position={[0, -0.2, 0.6]} material-color="grey" />
        <Cylinder
          args={[0.2, 0.2, 0.1, 16]}
          position={[-0.5, -0.2, -0.6]}
          rotation={[Math.PI / 2, 0, 4.7]}
          material-color="grey"
        />
        <Cylinder
          args={[0.2, 0.2, 0.1, 16]}
          position={[0.5, -0.2, -0.6]}
          rotation={[Math.PI / 2, 0, 4.7]}
          material-color="grey"
        />
      </group>
    </>
  );
};

export default Vehicle;
