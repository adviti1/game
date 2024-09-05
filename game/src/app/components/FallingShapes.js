import { useState } from 'react';
import { useRapier, RigidBody } from '@react-three/rapier';

const FallingShapes = () => {
  const [shapes, setShapes] = useState([]);

  
  const addShape = () => {
    const shapeType = Math.random() < 0.5 ? 'box' : 'sphere';
    setShapes((prevShapes) => [...prevShapes, { type: shapeType, position: randomPosition() }]);
  };

  return (
    <>
      {shapes.map((shape, index) => (
        <RigidBody key={index} position={shape.position} type="dynamic">
          {shape.type === 'box' ? <Box args={[1, 1, 1]} /> : <Sphere args={[0.5]} />}
        </RigidBody>
      ))}
    </>
  );
};

export default FallingShapes;
