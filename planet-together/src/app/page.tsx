"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'
import { PrismaClient, System, Planet } from '@prisma/client'
import PlanetSystem from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'
import { useRouter } from 'next/router'

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
export interface PageProps {
  system: System

  planets: Planet[]
}

export default function Home(props: PageProps) {
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


  useEffect(() => {
    let newPlanetArray: PlanetData[] = [];
    if (props.planets) {
      props.planets.forEach((planet) => {
        newPlanetArray.push({
          planetName: planet.name,
          position: new THREE.Vector3(planet.position_x, planet.position_y, planet.position_z),
          mass: planet.mass,
          velocity: new THREE.Vector3(planet.velocity_x, planet.velocity_y, planet.velocity_z),
          next_velocity: new THREE.Vector3(0, 0, 0),
          texture: planet.texture,
          radius: planet.radius,
          show: true,
          ref: useRef<THREE.Mesh>(null!),
          planets: planets,
          setPlanets: setPlanets
        })

      })
      setPlanets(newPlanetArray);
    }

  }, [])
  //         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex h-full">
        <Sidebar setIsOrbit={setIsOrbit} />
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <PlanetSystem setPlanets={setPlanets} planets={planets} />
          <OrbitControls zoom0={0.5} enabled={isOrbit} />
          <Stars />
        </Canvas>
        <div className="w-1/4 bg-zinc-900">
        </div>
      </div>
    </main>
  );
}





