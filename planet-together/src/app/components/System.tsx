"use client"
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Planet from './Planet'

export interface PlanetData {
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  next_velocity: THREE.Vector3,
  ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}

export default function System(props: ThreeElements['mesh']) {

  const G = 6.67 * 10 ** (-11)
  const ratio = 10 ^ (-8)
  const period = 3600

  const planet1: PlanetData = {
    position: new THREE.Vector3(1, 0.1, 0.1),
    mass: 1000000,
    velocity: new THREE.Vector3(1, 1, 1),
    next_velocity: new THREE.Vector3(0, 0, 0),
    ref: useRef<THREE.Mesh>(null!),
  }

  const planet2: PlanetData = {
    position: new THREE.Vector3(-1, 0.1, 0.1),
    mass: 1000000,
    velocity: new THREE.Vector3(1, 1, 1),
    next_velocity: new THREE.Vector3(0, 0, 0),
    ref: useRef<THREE.Mesh>(null!),
  }

  const [planets, setPlanets] = useState<PlanetData[]>([])

  useFrame((state, delta) => {


    planets.forEach((planet_a) => {

      let force_vector = new THREE.Vector3(0, 0, 0)

      planets.forEach((planet_b) => {
          if (planet_a === planet_b) return

          const numerator = new THREE.Vector3(G * planet_a.mass * planet_b.mass, G * planet_a.mass * planet_b.mass, G * planet_a.mass * planet_b.mass)
          //const denominator = planet_a.position.add(planet_b.position.multiplyScalar(-1)).multiply(planet_a.position.add(planet_b.position.multiplyScalar(-1)))
          const denominator = planet_a.position.distanceToSquared(planet_b.position);
          if (denominator === 0) return 
          force_vector.add(numerator.divideScalar(denominator))

        })
      
      const acceleration = force_vector.multiplyScalar(1/planet_a.mass)
      planet_a.next_velocity.add(acceleration.multiplyScalar(ratio))
      
      })

    planets.forEach((planet) => {
      planet.position.add(planet.next_velocity)
      planet.velocity = planet.next_velocity
      planet.ref.current.position.set(planet.position.x, planet.position.y, planet.position.z);
    })
    }
  )
  
  useEffect(() => {setPlanets([...planets, planet1, planet2])}, [1])
  return (
    <>
      {planets.map((planetData: PlanetData) => (<Planet planetData={planetData}/>))}
    </>
  )
}
