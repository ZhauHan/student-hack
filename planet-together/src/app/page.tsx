"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from './components/Planet'
import System from './components/System'

export default function Home() {
  const [isOrbit, setIsOrbit] = useState(false)
  return (
    <main className="bg-zinc-800 h-dvh">
      <div className="text-amber-200 p-5 text-xl font-bold">Welcome to Planet Together!</div>
      <button onClick={() => {setIsOrbit(!isOrbit)}}>Change Camera Mode</button>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <System />
         <OrbitControls zoom0={0.5} enabled={isOrbit}/>
      </Canvas>
    </main >
  );
}




