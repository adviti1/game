"use client";

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Vehicle from './components/Vehicle';

import FallingShapes from './components/FallingShapes';

export default function Page() {
  return (
    <div style={{ height: '100vh' }}>
      <h1>My Vehicle Game</h1>
      <Canvas>
        <Physics>
          <Vehicle />
          <FallingShapes />
        </Physics>
      </Canvas>
    </div>
  );
}
