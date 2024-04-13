"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from './components/Planet'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'

export default function Home() {
  return (
    <main className="bg-zinc-800 h-screen">
      
      <div className='flex h-screen'>
        <Sidebar />
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Planet position={[0, 0, 0]} />
          <OrbitControls />
          <Stars />
        </Canvas>,
      </div>
    </main >
  );
}




