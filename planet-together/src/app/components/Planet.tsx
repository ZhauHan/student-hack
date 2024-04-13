"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import type { PlanetData } from './System'


const Planet: React.FC<{ planetData: PlanetData }> = ({ planetData }) => {

    const ref = planetData.ref;
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)


    const texture = new THREE.TextureLoader().load('images/ear0xuu2.jpg'); 
  
    return (

      <mesh
        {...planetData}
        ref={ref}
        scale={0.2}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[planetData.radius]} />
        <meshStandardMaterial map={texture} />
      </mesh>

    )
  }

export default Planet;