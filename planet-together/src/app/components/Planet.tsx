"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import type { PlanetData } from './System'


const Planet: React.FC<PlanetData> = ({ planetData }) => {

    const ref = planetData.ref;
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    useFrame((state, delta) => {
            ref.current.rotation.x += delta
            ref.current.rotation.y += delta
        }
    )

    const texture = new THREE.TextureLoader().load('images/ear0xuu2.jpg'); 
  
    return (

      <mesh
        ref={ref}
        scale={0.2}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial map={texture} />
      </mesh>

    )
  }

export default Planet;