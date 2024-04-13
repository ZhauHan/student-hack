"use client"
import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Html } from "@react-three/drei"

function Planet(props: {
  texture: string, 
  mesh: ThreeElements['mesh'], 
  position: [number, number, number], 
  onClick: () => void, 
  planetCount: number,
  setPlanetCount: React.Dispatch<React.SetStateAction<number>>
}) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    
    useFrame((state, delta) => {
      ref.current.rotation.x += delta
      ref.current.rotation.y += delta
    }
    )

    const texture = new THREE.TextureLoader().load(props.texture);

    return (

      <mesh
        {...props}
        ref={ref}
        scale={1}
        onClick={props.onClick}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial map={texture} />
      </mesh>

    )
  }

export default function ThreePlanets(props: {
  planetCount: number,
  setPlanetCount: React.Dispatch<React.SetStateAction<number>>
  visiblePlanets: { texture: string, isVisible: boolean }[]
  setVisiblePlanets: React.Dispatch<React.SetStateAction<{ texture: string, isVisible: boolean }[]>>
}) {

  // const [planetCount, setPlanetCount] = useState(3);

  const handleAddPlanet = (planetTexture: string) => {
    props.setVisiblePlanets([...props.visiblePlanets, {texture: planetTexture, isVisible: true}]);
    props.setPlanetCount(prevPlanetCount => prevPlanetCount + 1);
    console.log("Planet count: ", props.planetCount);
  };
  
  // const handleClick = (index: number) =>  {
  //   setVisiblePlanets(prevVisiblePlanets => {
  //       const newVisiblePlanets = [...prevVisiblePlanets];
  //       newVisiblePlanets[index].isVisible = false;
  //       setPlanetCount(planetCount => planetCount - 1);
  //       return newVisiblePlanets;
  //   });
  //   setPlanetCount(planetCount => planetCount - 1);
  //   console.log("Planet count: ", planetCount);
  // };

  return (
  <>
    {/* <div>Number of planets: {planetCount}</div> */}
     {props.visiblePlanets.map((planet, index) => 
      planet.isVisible && 
      <Planet 
        key={index} 
        mesh={{}} 
        position={[index * 10, 0, 0]} 
        texture={planet.texture} 
        onClick={() => handleAddPlanet(planet.texture)} 
        planetCount={props.planetCount} 
        setPlanetCount={props.setPlanetCount}
      />
    )}
  </>
  );
}