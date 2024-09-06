"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Vehicle from './components/Vehicle';
import FallingShapes from './components/FallingShapes';

export default function Page() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'white',
      backgroundImage: 'url(/src/OIP (2).jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      {!gameStarted && (
        <button
          onClick={startGame}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '1rem 2rem',
            fontSize: '1.5rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Play
        </button>
      )}
      {gameStarted && (
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Physics>
            <Vehicle />
            <FallingShapes />
          </Physics>
        </Canvas>
      )}
    </div>
  );
}
