import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Float, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import type { Molecule, Atom as AtomType } from '../../data/moleculeLibrary'
import { useStore } from '../../store/useStore'

const ELEMENT_COLORS: Record<string, string> = {
  C: '#2D2D2D', // Deep Slate/Black
  H: '#FFFFFF', // Pure White
  O: '#FF0033', // Neon Red
  N: '#3366FF', // Electric Blue
  S: '#FFCC00', // Scientific Yellow
  P: '#FF8800', // Vibrant Orange
  Cl: '#33FF33', // Bio Green
}

const ELEMENT_RADII: Record<string, number> = {
  C: 0.77,
  H: 0.37,
  O: 0.73,
  N: 0.75,
  S: 1.02,
  P: 1.06,
  Cl: 0.99,
}

// Reusable Atom Component
const Atom: React.FC<{ atom: AtomType }> = ({ atom }) => {
  const color = ELEMENT_COLORS[atom.element] || '#CCCCCC'
  const radius = (ELEMENT_RADII[atom.element] || 0.7) * 0.45

  return (
    <mesh position={atom.position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.05} 
        metalness={0.2}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

// Reusable Bond Component (Handles Single, Double, Triple)
const Bond: React.FC<{ start: [number, number, number]; end: [number, number, number]; type: 1 | 2 | 3 }> = ({ start, end, type }) => {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const direction = new THREE.Vector3().subVectors(endVec, startVec)
  const length = direction.length()
  const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())

  const cylinders = useMemo(() => {
    const res = []
    if (type === 1) {
      res.push(
        <mesh key="1" position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.07, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
    } else if (type === 2) {
      res.push(
        <mesh key="1" position={[0.08, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
      res.push(
        <mesh key="2" position={[-0.08, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
    } else if (type === 3) {
      res.push(
        <mesh key="1" position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
      res.push(
        <mesh key="2" position={[0.11, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
      res.push(
        <mesh key="3" position={[-0.11, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      )
    }
    return res
  }, [type, length])

  return (
    <group position={midpoint} quaternion={quaternion}>
      {cylinders}
    </group>
  )
}

const MoleculeMesh: React.FC<{ molecule: Molecule }> = ({ molecule }) => {
  const groupRef = useRef<THREE.Group>(null)

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {molecule.atoms.map((atom, i) => (
        <Atom key={`atom-${i}`} atom={atom} />
      ))}
      {molecule.bonds.map((bond, i) => (
        <Bond 
          key={`bond-${i}`} 
          start={molecule.atoms[bond.start].position} 
          end={molecule.atoms[bond.end].position} 
          type={bond.type} 
        />
      ))}
    </group>
  )
}

export const MoleculeViewer3D: React.FC<{ molecule: Molecule }> = ({ molecule }) => {
  const theme = useStore((state) => state.theme)

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[5, 5, 8]} fov={45} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          rotateSpeed={0.8} 
          minDistance={3} 
          maxDistance={15} 
        />
        
        {/* Scientific Lighting */}
        <ambientLight intensity={theme === 'dark' ? 0.4 : 0.6} />
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={theme === 'dark' ? 1.5 : 1.8} castShadow />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color={theme === 'dark' ? '#4f46e5' : '#818cf8'} />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <MoleculeMesh molecule={molecule} />
          </Float>
          
          <ContactShadows 
            position={[0, -4, 0]} 
            opacity={theme === 'dark' ? 0.3 : 0.15} 
            scale={20} 
            blur={3} 
            far={10} 
          />
          
          <Environment preset={theme === 'dark' ? 'night' : 'city'} />
          
          {/* Scientific Grid / Particles */}
          {theme === 'dark' && (
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
