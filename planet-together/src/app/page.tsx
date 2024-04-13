"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from './components/Planet'
import ThreePlanets from './components/Planet'

export default function Home() {
  const [visiblePlanets, setVisiblePlanets] = useState([
    { texture: 'images/sat0fds1.jpg', isVisible: true },
    { texture: 'images/mar2kuu2.jpg', isVisible: true },
    { texture: 'images/ear0xuu2.jpg', isVisible: true },
  ]);
  const [planetCount, setPlanetCount] = useState(3);

  // const handleAddPlanet = () => {
  //   const newPlanets = [];
  //   const numberOfNewPlanets = 1; // Change this to the number of planets you want to add

  //   for (let i = 0; i < numberOfNewPlanets; i++) {
  //     newPlanets.push(true);
  //   }
  //   setVisiblePlanets(prevVisiblePlanets => [...prevVisiblePlanets, true]);
  //   setPlanetCount(planetCount => planetCount + 1);
  // };

  // const handleClick = (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setVisiblePlanets(prevVisiblePlanets => {
  //     const newVisiblePlanets = [...prevVisiblePlanets];
  //     newVisiblePlanets[index] = false;
  //     return newVisiblePlanets;
  //   });
  //   setPlanetCount(planetCount => planetCount - 1);
  // };


  // // button1 click event listener to apply function
  // button1.addEventListener("click", function() {}
  

  return (
    <main className="bg-zinc-800 h-dvh">
      <div className="text-amber-200 p-5 text-xl font-bold">Welcome to Planet Together!</div>
      <div>
        <p style={{ color: 'red' }}> Current planet count: {planetCount}</p>
      </div>

      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>
        <OrbitControls />
      </Canvas>,
    </main >
  );
}





