import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const FloatingBook = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <MeshDistortMaterial
          color="#2d6a4f"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

const FloatingShape = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere args={[0.4, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.3}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b6f47" />
      
      <FloatingBook position={[-3, 1, 0]} />
      <FloatingBook position={[3, -1, -1]} />
      <FloatingBook position={[-2, -2, -2]} />
      
      <FloatingShape position={[4, 2, 0]} color="#2d6a4f" />
      <FloatingShape position={[-4, -1, 0]} color="#8b6f47" />
      <FloatingShape position={[2, 3, -1]} color="#1b4332" />
      <FloatingShape position={[-3, 2, -2]} color="#a68a64" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
