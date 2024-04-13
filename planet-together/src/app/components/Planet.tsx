"use client"
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

function Planet(props: ThreeElements['mesh']) {

    const ref = useRef<THREE.Mesh>(null!)
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
        {...props}
        ref={ref}
        scale={1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial map={texture} />
      </mesh>

    )
  }

export default Planet;