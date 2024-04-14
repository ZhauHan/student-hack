"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect, createRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

import System from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'
import SpeedScrollBar from './components/SpeedScrollBar'
import { SliderValue } from '@nextui-org/react'
import { randFloat } from 'three/src/math/MathUtils.js'
export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  texture: string,
  radius: number,
  show: boolean,
  planets: PlanetData[],
  setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>,
  ref: React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}



const MovingGrid = (props: { planets:PlanetData[], setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>, isAdding: boolean }) => {
  const gridRef = useRef<THREE.GridHelper>(null)

  const { raycaster, mouse, camera, scene } = useThree()

  const handleAddRandomPlanet = (position:THREE.Vector3) => {
    const randomPlanet:PlanetData = {
      planetName: "planet" + props.planets.length,
      position: position,
      mass: randFloat(3e15, 9e24),
      velocity: new THREE.Vector3(randFloat(-3000, 3000), randFloat(-3000, 3000), randFloat(-3000, 3000)),
      texture: 'images/ear0xuu2.jpg',
      radius: randFloat(0.1, 1),
      show: true,
      planets: props.planets,
      setPlanets: props.setPlanets,
      ref: createRef<THREE.Mesh>(),
    }

    props.setPlanets([...props.planets, randomPlanet])
  };

  const onClick = (event: MouseEvent) => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(gridRef.current!)
    if (intersects.length > 0) {
      const intersect = intersects[0]
      if (props.isAdding) {
        handleAddRandomPlanet(new THREE.Vector3(intersect.point.x, intersect.point.y, intersect.point.z))
      }
    }
  }


    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('mousedown', onClick)
    }
    // // Clean up the event listener on unmount
    // return () => {
    //   if (canvas) {
    //     canvas.removeEventListener('mousedown', onClick)
    //   }
    // }


  useFrame(({ camera }) => {
    // Update the position of the object to follow the camera
    if (gridRef.current) {
      // Calculate the camera's downward direction
      const down = new THREE.Vector3(0, -1, 0)
      down.applyQuaternion(camera.quaternion)
  
      // Create a new position for the grid that's offset from the camera's position along the camera's downward direction
      const gridPosition = camera.position.clone().add(down.multiplyScalar(4))
  
      // Set the grid's position to the new position
      gridRef.current.position.copy(gridPosition)
  
      // Update the position and rotation of the object
      gridRef.current.rotation.copy(camera.rotation)
      
      const adjustedCameraPosition = camera.position.clone()
      adjustedCameraPosition.y += Math.tan(THREE.MathUtils.degToRad(-50))


      // Copy the object's rotation to the grid's rotation
      // gridRef.current.lookAt(adjustedCameraPosition)
    }
  })

  

  return (
    <>
      <gridHelper ref={gridRef} args={[250,50]} />
    </>
  )
}


export default function Home() {
  const [visiblePlanets, setVisiblePlanets] = useState([
    { name: 'Saturn', texture: 'images/sat0fds1.jpg', isVisible: true },
    { name: 'Mars', texture: 'images/mar2kuu2.jpg', isVisible: true },
    { name: 'Earth', texture: 'images/ear0xuu2.jpg', isVisible: true },
  ]);
  
  const [isOrbit, setIsOrbit] = useState(true)

  const [planetCount, setPlanetCount] = useState(0);

  const [planets, setPlanets] = useState<PlanetData[]>([])

  const [updateFreq, setUpdateFreq] = useState<SliderValue>(0.1)

  const [isAdding, setIsAdding] = useState<boolean>(false)

  const stars = React.useMemo( () => <Stars />, [])
  useEffect(() => {
    setPlanetCount(planets.length);
  }, [planets])

//         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex flex-col h-full">
        <Sidebar visiblePlanets={visiblePlanets} setIsOrbit={setIsOrbit} isOrbit={ isOrbit } planetCount={ planetCount }/>
        <Canvas className="w-max h-max">
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <System setPlanets={setPlanets} planets={planets} updateFreq={updateFreq}/>
          <OrbitControls zoom0={0.5} enabled={isOrbit}/>
          { stars }
        </Canvas>
        <div className="flex justify-center">
          <SpeedScrollBar setUpdateFreq={setUpdateFreq} />
        </div>
      </div>
    </main>
  );
}





