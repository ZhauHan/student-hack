"use client"
import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Html } from "@react-three/drei"
import type { PlanetData } from '../page'

const Planet: React.FC<{ planetData: PlanetData }> = ({ planetData }) => {

    const ref = planetData.ref;

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    useFrame((state, delta) => {
      ref.current.rotation.x += delta
      ref.current.rotation.y += delta
      }
    )

      
    const handleRemovePlanet = (index: number) =>  {
      if (index === -1) return
      console.log(index)
      let newPlanets: PlanetData[] = []
      for (let i = 0; i < planetData.planets.length; i++) {
        if (i === index) continue
        newPlanets.push(planetData.planets[i])
      }
      planetData.setPlanets(newPlanets)
    };

    const texture = new THREE.TextureLoader().load(planetData.texture);

    return (
        <mesh
        {...planetData}
        visible={planetData.show}
        ref={ref}
        scale={1}
        onClick={() => {handleRemovePlanet(planetData.planets.findIndex((i) => (i.planetName === planetData.planetName)))}}>
        <sphereGeometry args={[planetData.radius]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    )
  }

export default Planet;
