"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import System from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'

export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  next_velocity: THREE.Vector3,
  texture: string,
  radius: number,
  show: boolean,
  planets: PlanetData[],
  setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>,
  ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}
export default function Home() {
  const [visiblePlanets, setVisiblePlanets] = useState([
    { texture: 'images/sat0fds1.jpg', isVisible: true },
    { texture: 'images/mar2kuu2.jpg', isVisible: true },
    { texture: 'images/ear0xuu2.jpg', isVisible: true },
  ]);
  
  const [isOrbit, setIsOrbit] = useState(true)

  const [planetCount, setPlanetCount] = useState(0);

  const [planets, setPlanets] = useState<PlanetData[]>([])

  useEffect(() => {
    setPlanetCount(planets.length);
  }, [planets])

//         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex h-screen">
        <div className="text-amber-200 p-5 text-xl font-bold">Welcome to Planet Together!</div>

        <button onClick={() => {setIsOrbit(!isOrbit)}}>Change Camera Mode</button>
        <div>
          <p style={{ color: 'red' }}> Current planet count: {planetCount}</p>
        </div>
        <Sidebar />
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





