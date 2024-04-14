"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'

import System from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'
import SpeedScrollBar from './components/SpeedScrollBar'
import { SliderValue } from '@nextui-org/react'
export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
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

  const [updateFreq, setUpdateFreq] = useState<SliderValue>(0.1)

  const stars = React.useMemo( () => <Stars />, [])
  useEffect(() => {
    setPlanetCount(planets.length);
  }, [planets])

//         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex h-full">
        <Sidebar setIsOrbit={ setIsOrbit } isOrbit={ isOrbit } planetCount={ planetCount }/>
        <div className="flex flex-col grow h-full">
          <Canvas className="w-max h-max">
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <System setPlanets={setPlanets} planets={planets} updateFreq={updateFreq}/>
            <OrbitControls zoom0={0.5} enabled={isOrbit}/>
            { stars }
          </Canvas>
          <div className="flex justify-center">
            <SpeedScrollBar setUpdateFreq={setUpdateFreq} />
          </div>
        </div>
      </div>
    </main>
  );
}





