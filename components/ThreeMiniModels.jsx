"use client"
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function RotatingGroup() {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    // Linear bouncing (triangle wave) along a vertical column
    const period = 6 // seconds
    const u = (state.clock.elapsedTime % period) / period
    const tri = 1 - Math.abs(2 * u - 1) // 0->1->0 linear
    const yMin = -0.6
    const yMax = 0.6
    const y = yMin + tri * (yMax - yMin)
    // place in a right-side column, slight depth
    ref.current.position.set(1.5, y, -0.3)
  })
  return (
    <group ref={ref} position={[1.5, 0, -0.3]}>
      {/* Arduino-like board (box + pins) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.9, 0.08, 1.2]} />
        <meshStandardMaterial color="#0b1b6f" emissive="#1d4ed8" emissiveIntensity={0.2} metalness={0.2} roughness={0.55} />
      </mesh>
      {/* simple header pins */}
      {Array.from({length:6}).map((_,i)=>(
        <mesh key={`p1-${i}`} position={[-0.7 + i*0.28, 0.06, 0.55]}>
          <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
      ))}
      {Array.from({length:6}).map((_,i)=>(
        <mesh key={`p2-${i}`} position={[-0.7 + i*0.28, 0.06, -0.55]}>
          <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
      ))}
    </group>
  )
}

function MiniRocket({ start = [-3, -0.8, -1], end = [3, 1.2, -0.6], speed = 0.18 }) {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime * speed) % 1
    // simple lerp path
    const x = start[0] + (end[0] - start[0]) * t
    const y = start[1] + (end[1] - start[1]) * t
    const z = start[2] + (end[2] - start[2]) * t
    ref.current.position.set(x, y, z)
    ref.current.rotation.z = Math.atan2(end[1] - start[1], end[0] - start[0])
  })
  return (
    <group ref={ref}>
      {/* body */}
      <mesh>
        <coneGeometry args={[0.06, 0.18, 16]} />
        <meshStandardMaterial color="#f3f4f6" emissive="#9ca3af" emissiveIntensity={0.15} metalness={0.35} roughness={0.35} />
      </mesh>
      {/* booster */}
      <mesh position={[0, -0.12, 0]}> 
        <cylinderGeometry args={[0.028, 0.04, 0.1, 12]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      {/* flames */}
      <mesh position={[0, -0.18, 0]}>
        <coneGeometry args={[0.035, 0.12, 12]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

function MiniSatellite({ radius = 2.6, speed = 0.18, tilt = 0.4 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    const x = Math.cos(t) * radius
    const y = Math.sin(t) * radius * 0.4
    ref.current.position.set(x, 0.2 + y, -1.2)
    ref.current.rotation.y = t
    ref.current.rotation.x = tilt
  })
  return (
    <group ref={ref}>
      {/* body */}
      <mesh>
        <boxGeometry args={[0.18, 0.12, 0.12]} />
        <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* panels */}
      <mesh position={[0.22, 0, 0]}>
        <boxGeometry args={[0.28, 0.08, 0.02]} />
        <meshStandardMaterial color="#1f2937" emissive="#4C8BFF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.22, 0, 0]}>
        <boxGeometry args={[0.28, 0.08, 0.02]} />
        <meshStandardMaterial color="#1f2937" emissive="#4C8BFF" emissiveIntensity={0.2} />
      </mesh>
      {/* antenna */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
    </group>
  )
}

export default function ThreeMiniModels({ className = '', height = 280 }) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ height }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 1.2, 3], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={0.8} />
        <pointLight position={[-4, -2, -4]} intensity={0.3} />
        <Suspense fallback={null}>
          <RotatingGroup />
          {/* Shooting elements */}
          <MiniRocket />
          <MiniSatellite />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}
