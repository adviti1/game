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
        <Physics>
          <Vehicle />
          <FallingShapes />
        </Physics>
      </Canvas>
    </div>
  );
}
