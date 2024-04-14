"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'

import System from './components/System'
import Sidebar from './components/Sidebar'
import Stars from './components/Stars'

export interface PlanetData {
  planetName: String
  position: THREE.Vector3,
  mass: number,
  velocity: THREE.Vector3,
  next_velocity: THREE.Vector3,
  texture: string,
  radius: number,
  show: boolean,
  planets: PlanetData[],
  setPlanets: React.Dispatch<React.SetStateAction<PlanetData[]>>,
  ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>,
}

const MovingGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null)

  const { raycaster, mouse, camera, scene } = useThree()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(gridRef.current!)
      if (intersects.length > 0) {
        const intersect = intersects[0]
        console.log(intersect.point)
      }
    }
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('mousedown', onClick)
    }
    // Clean up the event listener on unmount
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', onClick)
      }
    }
  } , [raycaster, mouse, camera])


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
      <gridHelper ref={gridRef} args={[500,500]} />
    </>
  )
}


export default function Home() {
  const [visiblePlanets, setVisiblePlanets] = useState([
    { texture: 'images/sat0fds1.jpg', isVisible: true },
    { texture: 'images/mar2kuu2.jpg', isVisible: true },
    { texture: 'images/ear0xuu2.jpg', isVisible: true },
  ]);
  
  const [isOrbit, setIsOrbit] = useState(true)

  const [planetCount, setPlanetCount] = useState(0);

  const [planets, setPlanets] = useState<PlanetData[]>([])

  useEffect(() => {
    setPlanetCount(planets.length);
  }, [planets])

//         <ThreePlanets setPlanetCount={setPlanetCount} planetCount={planetCount} setVisiblePlanets={setVisiblePlanets} visiblePlanets={visiblePlanets}/>

  return (
    <main className="bg-zinc-800 h-screen">
      <div className="flex h-full">
        <Sidebar setIsOrbit={ setIsOrbit }/>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <MovingGrid />
          <System setPlanets={setPlanets} planets={planets}/>
          <OrbitControls zoom0={0.5} enabled={isOrbit}/>
          <Stars />
        </Canvas>
      </div>
    </main>
  );
}





