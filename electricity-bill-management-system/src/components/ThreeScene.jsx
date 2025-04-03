import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';

function LightBulb() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      position={[0, 0, 0]}
    >
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight color="#FDB813" intensity={2} distance={20} />
    </Float>
  );
}

function EnergyWaves() {
  return (
    <group>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 2]}>
          <torusGeometry args={[3 + i * 0.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#4F46E5"
            emissive="#4F46E5"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[400px] w-full"
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <LightBulb />
        <EnergyWaves />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </motion.div>
  );
}