"use client"
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import Planet from './Planet'
import { PlanetData } from '../page'


export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  next_velocity: THREE.Vector3,
  radius: number,
  show: boolean,
  ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}


export default function System(props: {setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>, planets: PlanetData[]}) {

  const G = 6.67 * 10 ** (-11)
  const ratio = 1e-30
  const period = 3600
  

  const planet1: PlanetData = {
    planetName: "planet1",
    position: new THREE.Vector3(0, 0, 0),
    mass: 3.285e24,
    velocity: new THREE.Vector3(0, 1000, 0),
    next_velocity: new THREE.Vector3(1, 0, 0),
    radius: 1.0,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
  };

  const planet2: PlanetData = {
    planetName: "planet2",
    position: new THREE.Vector3(1.5, 0, 0),
    mass: 3.285e23,
    velocity: new THREE.Vector3(0, -10000, 0),
    next_velocity: new THREE.Vector3(0, -1000000, 0),
    radius: 1.0,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
  };

  const planet3: PlanetData = {
    planetName: "planet3",
    position: new THREE.Vector3(-1.5, 1, 0),
    mass: 3.285e23,
    velocity: new THREE.Vector3(2500, -7000, 3000),
    next_velocity: new THREE.Vector3(0, -1000000, 0),
    radius: 0.5,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
  };


  useEffect(() => {props.setPlanets([...props.planets, planet1, planet2, planet3])}, [])

  useFrame((state, delta) => {

    props.planets.forEach((currPlanet) => {
      console.log(currPlanet.velocity)
      const acceleration = new THREE.Vector3(0, 0, 0)
      props.planets.forEach((otherPlanet) => {
        if (otherPlanet.planetName !== currPlanet.planetName) {

          const direction = new THREE.Vector3().subVectors(otherPlanet.position, currPlanet.position).multiplyScalar(1000000);
          const distanceSquared = direction.lengthSq();
          const forceMagnitude = (G * currPlanet.mass * otherPlanet.mass) / distanceSquared;
          const force = direction.normalize().multiplyScalar(forceMagnitude);
          
          acceleration.add(force.divideScalar(currPlanet.mass));
          const distance = new THREE.Vector3()
          distance.copy(direction)
          
          if (distance.length() < 0.0001) {

            acceleration.copy(new THREE.Vector3(0,0,0))
            currPlanet.velocity.copy(new THREE.Vector3(0,0,0))
            currPlanet.show = false;
            console.log(`RAAAGHHHHHHHH: ${distance.length()}`)
            return
          }
        }
      });
      currPlanet.velocity.add(acceleration);
      const scaledVelocity = new THREE.Vector3();
      scaledVelocity.copy(currPlanet.velocity);
      scaledVelocity.divideScalar(1000000);
      currPlanet.position.add(scaledVelocity);

      
    });

    props.planets.forEach((planet) => {
      planet.ref.current.position.copy(planet.position)
    })
    })

  return (
    <>
      {props.planets.map((planetData: PlanetData, index: number) => (<Planet key={index} planetData={planetData}/>))}
    </>
  )
}
