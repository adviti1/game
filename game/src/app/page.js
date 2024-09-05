"use client";

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Vehicle from './components/Vehicle';

export default function Page() {
  return (
    <div style={{ height: '100vh' }}>
      <h1>My Vehicle Game</h1>
      <Canvas>
      <Physics></Physics>
        <Vehicle />
      </Canvas>
    </div>
  );
}
