"use client"
import * as THREE from 'three'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Canvas, useFrame, ThreeElements, dispose } from '@react-three/fiber'
import Planet from './Planet'
import { PlanetData } from '../page'
import { Line } from '@react-three/drei'
import { SliderValue } from '@nextui-org/react'

export default function System(props: {setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>, planets: PlanetData[], updateFreq: SliderValue}) {

  const G = 6.67 * 10 ** (-11)
  const ratio = 1e-30
  const period = 60
      
  const planet1: PlanetData = {
    planetName: "planet1",
    position: new THREE.Vector3(0, 2, 0),
    mass: 1.285e24,
    velocity: new THREE.Vector3(1000, 0, -2000),
    texture: 'images/ear0xuu2.jpg',
    radius: 0.3,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
    planets: props.planets,
    setPlanets: props.setPlanets,
  };

  const planet2: PlanetData = {
    planetName: "planet2",
    position: new THREE.Vector3(4, 0, 0),
    mass: 3.285e23,
    velocity: new THREE.Vector3(-1000, 2000, 0),
    texture: 'images/sat0fds1.jpg',
    radius: 0.3,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
    planets: props.planets,
    setPlanets: props.setPlanets,
  };

  const planet3: PlanetData = {
    planetName: "planet3",
    position: new THREE.Vector3(-1.5, 1, 0),
    mass: 3.285e23,
    velocity: new THREE.Vector3(2500, -7000, 3000),
    texture: 'images/mar2kuu2.jpg',
    radius: 0.1,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
    planets: props.planets,
    setPlanets: props.setPlanets,
  };

  const planet4: PlanetData = {
    planetName: "planet4",
    position: new THREE.Vector3(0,1,5),
    mass: 3e23,
    velocity: new THREE.Vector3(2500,7000,-3000),
    texture: 'images/moon.jpg',
    radius: 0.1,
    show: true,
    ref: useRef<THREE.Mesh>(null!),
    planets: props.planets,
    setPlanets: props.setPlanets,

  }
  const [tempRemove, setTempRemove] = useState<number[] >([]);

  useEffect(() => {props.setPlanets([...props.planets, planet1, planet2, planet3,planet4])
  }, [])
  props.planets.map((planet) => {planet.planets = props.planets})
    const useDidMountEffect = (func: any, deps: any) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;}, deps);
    }

  const updateFrequency = Math.E ** -props.updateFreq; // Update every 0.1 seconds
  let lastUpdate = Date.now();
  useFrame((state, delta) => {

    const now = Date.now();
      if (now - lastUpdate > Number(updateFrequency) * 1000) {
        lastUpdate = now;
        let removalArray: PlanetData[] = [];
        let removal = false;
        props.planets.forEach((currPlanet, index) => {
          if (!currPlanet.ref.current) return
          const acceleration = new THREE.Vector3(0, 0, 0)
          props.planets.forEach((otherPlanet) => {
            if (otherPlanet.planetName !== currPlanet.planetName) {
              if (!otherPlanet.ref.current) return
              const direction = new THREE.Vector3().subVectors(otherPlanet.position, currPlanet.position).multiplyScalar(1000000);
              const distanceSquared = direction.lengthSq();
              const forceMagnitude = (G * currPlanet.mass * otherPlanet.mass) / distanceSquared;
              const force = direction.normalize().multiplyScalar(forceMagnitude);
              
              acceleration.add(force.divideScalar(currPlanet.mass));
              const distance = currPlanet.position.distanceTo(otherPlanet.position);

              if (distance < otherPlanet.radius + currPlanet.radius) {

                //currPlanet.show = false;
                //setTempRemove([...tempRemove, index]);
                //acceleration.copy(new THREE.Vector3(0,0,0))
                //currPlanet.velocity.copy(new THREE.Vector3(0,0,0))
                if (!currPlanet.ref.current) return
                if (!currPlanet.ref.current.parent) return
                currPlanet.ref!.current!.parent.remove(currPlanet.ref!.current!)
                removalArray.push(currPlanet)
                removalArray.push(otherPlanet)
                removal = true
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

          if (removal) {
            let newPlanets: PlanetData[] = []
            for (let i = 0; i < props.planets.length; i++) {
              if (removalArray.find((j) => j === props.planets[i])) continue
              newPlanets.push(props.planets[i])
            }
            props.setPlanets(newPlanets)
            removalArray = [];
          }

          props.planets.forEach((planet) => {
            if (!planet.ref.current) return
            planet.ref.current.position.copy(planet.position)
          })
      }
    
    })

    // useDidMountEffect(() => {
    //   const removeIndex = tempRemove[tempRemove.length]
    //   let newPlanets: PlanetData[] = [];
    //   for (let i = 0; i < props.planets.length;i++) {
    //     console.log(i, removeIndex)
    //      if (i === removeIndex){
    //        continue
    //      } 
    //      newPlanets.push(props.planets[i])
    //   }
    //   props.setPlanets(newPlanets)
    // }, [tempRemove])
    



  return (
    <>
      {props.planets.map((planetData: PlanetData, index: number) => (
          <Planet planetData={planetData}/>
      ))}
    </>
  )
}
