"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'
import Planet from './components/Planet'
import System from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'

export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  next_velocity: THREE.Vector3,
  radius: number,
  show: boolean,
  ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}


export default function Home() {
  const [visiblePlanets, setVisiblePlanets] = useState([
    { texture: 'images/sat0fds1.jpg', isVisible: true },
    { texture: 'images/mar2kuu2.jpg', isVisible: true },
    { texture: 'images/ear0xuu2.jpg', isVisible: true },
  ]);
  
  const [isOrbit, setIsOrbit] = useState(true)

  const [planetCount, setPlanetCount] = useState(3);

  const [planets, setPlanets] = useState<PlanetData[]>([])
//         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex h-full">
        <Sidebar setIsOrbit={ setIsOrbit }/>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <System setPlanets={setPlanets} planets={planets}/>
          <OrbitControls zoom0={0.5} enabled={isOrbit}/>
          <Stars />
        </Canvas>
      </div>
    </main>
  );
}





