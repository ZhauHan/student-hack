"use client"

import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Stars() {
  const ref = useRef<THREE.Points>(null!)

  // Create a particle system on mount
  const particles = new THREE.BufferGeometry();
  const particleCount = 5000;
  const particleArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    particleArray[i] = (Math.random() - 0.5) * 500;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(particleArray, 3));

  // Rotate the particle system every frame
  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  return (
    <points ref={ref} args={[particles]}>
      <pointsMaterial attach="material" size={0.005} color="white" />
    </points>
  );
}

export default Stars;