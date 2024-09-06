"use client";

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Vehicle from './components/Vehicle';

import FallingShapes from './components/FallingShapes';

export default function Page() {
  return (
    <div style={{ height: '100vh', backgroundColor: 'white' }}>
      <Canvas>
      {/* <directionalLight position={[0,0,2]}/> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
        <Physics>
          <Vehicle />
          <FallingShapes />
        </Physics>
      </Canvas>
    </div>
  );
}
