"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import type { PlanetData } from '../page'


const Planet: React.FC<{ planetData: PlanetData }> = ({ planetData }) => {

    const ref = planetData.ref;
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)


    const texture = new THREE.TextureLoader().load('images/ear0xuu2.jpg'); 
  
    return (

      <mesh
        {...planetData}
        visible={planetData.show}
        ref={ref}
        scale={1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[planetData.radius]} />
        <meshStandardMaterial map={texture} />
      </mesh>

    )
  }

export default Planet;