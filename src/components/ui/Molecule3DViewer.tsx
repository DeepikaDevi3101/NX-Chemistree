import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Float, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface Atom {
  element: string
  position: [number, number, number]
}

interface Bond {
  start: number
  end: number
}

interface MoleculeData {
  atoms: Atom[]
  bonds: Bond[]
}

const ELEMENT_COLORS: Record<string, string> = {
  C: '#909090',
  H: '#FFFFFF',
  O: '#FF0D0D',
  N: '#3050F8',
  S: '#FFFF30',
  P: '#FF8000',
  Cl: '#1FF01F',
  F: '#90E050',
  Br: '#A62929',
  I: '#940094',
}

const ELEMENT_RADII: Record<string, number> = {
  C: 0.77,
  H: 0.37,
  O: 0.73,
  N: 0.75,
  S: 1.02,
  P: 1.06,
  Cl: 0.99,
  F: 0.71,
  Br: 1.14,
  I: 1.33,
}

const AtomMesh: React.FC<{ element: string; position: [number, number, number] }> = ({ element, position }) => {
  const color = ELEMENT_COLORS[element] || '#CCCCCC'
  const radius = (ELEMENT_RADII[element] || 0.7) * 0.4

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.1} 
        metalness={0.1} 
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

const BondMesh: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ start, end }) => {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const direction = new THREE.Vector3().subVectors(endVec, startVec)
  const length = direction.length()
  const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)

  return (
    <mesh position={midpoint} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())}>
      <cylinderGeometry args={[0.08, 0.08, length, 8]} />
      <meshStandardMaterial color="#666666" roughness={0.3} />
    </mesh>
  )
}

export const Molecule3DViewer: React.FC<{ data: MoleculeData }> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls makeDefault minDistance={3} maxDistance={20} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
              {data.atoms.map((atom, i) => (
                <AtomMesh key={i} element={atom.element} position={atom.position} />
              ))}
              {data.bonds.map((bond, i) => (
                <BondMesh 
                  key={i} 
                  start={data.atoms[bond.start].position} 
                  end={data.atoms[bond.end].position} 
                />
              ))}
            </group>
          </Float>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}
