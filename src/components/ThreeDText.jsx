import * as THREE from "three";
import React, { useRef, useEffect, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import gsap from "gsap";

/**
 * ThreeDTextContent — Texto 3D volumétrico com rotação oscilante no eixo Z
 * Posição fixa em x=0, y=0 — nunca sai do campo visual
 * Rotação: -130° a +130° em loop contínuo com câmera móvel acompanhando
 * Memoizado para evitar re-renders desnecessários
 */
const ThreeDTextContent = memo(({ text, color }) => {
  const meshRef = useRef();
  const rotationRef = useRef(0);
  const directionRef = useRef(1);

  // Bounds de clipping para restringir ao viewport
  const BOUNDS = {
    x: { min: -2.0, max: 2.0 },
    y: { min: -1.5, max: 1.5 },
    z: { min: 2.5, max: 7.0 }
  };

  /**
   * Função auxiliar para clampar valores dentro dos bounds
   */
  const clampToBounds = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  };

  // Rotação oscilante no eixo Z: -130° a +130° em loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      const maxRotation = (130 * Math.PI) / 180; // 130° em radianos
      const speed = 0.25; // velocidade da oscilação

      rotationRef.current += directionRef.current * speed * delta;

      // Inverte direção ao atingir limites
      if (rotationRef.current >= maxRotation) {
        rotationRef.current = maxRotation;
        directionRef.current = -1;
      } else if (rotationRef.current <= -maxRotation) {
        rotationRef.current = -maxRotation;
        directionRef.current = 1;
      }

      meshRef.current.rotation.z = rotationRef.current;

      // Câmera com movimento confinado aos bounds
      const targetX = Math.sin(rotationRef.current) * 3.0; // Amplitude reduzida
      const targetY = Math.cos(rotationRef.current) * 1.2; // Amplitude reduzida
      const targetZ = 6 + Math.cos(rotationRef.current) * 1.5; // Amplitude reduzida

      // Aplicar clamping para garantir permanência dentro dos bounds
      state.camera.position.x = clampToBounds(targetX, BOUNDS.x.min, BOUNDS.x.max);
      state.camera.position.y = clampToBounds(targetY, BOUNDS.y.min, BOUNDS.y.max);
      state.camera.position.z = clampToBounds(targetZ, BOUNDS.z.min, BOUNDS.z.max);

      state.camera.lookAt(0, 0, 0);
    }
  });

  // GSAP: animação de entrada
  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }, []);

  // GSAP: efeito hover
  const handlePointerOver = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.2 });
    }
  };

  const handlePointerOut = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
  };

  return (
    <Suspense fallback={null}>
      <Center top>
        <group
          ref={meshRef}
          position={[0, 0, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <Text3D
            font="/fonts/Chonburi-Regular.json"
            size={1.2}
            height={0.4}
            curveSegments={4}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.015}
            bevelOffset={0}
            bevelSegments={3}
            letterSpacing={0.08}
            castShadow
            receiveShadow
          >
            {text}
            <meshStandardMaterial
              color={color}
              roughness={0.25}
              metalness={0.85}
              emissive={color}
              emissiveIntensity={0.15}
              side={THREE.FrontSide}
            />
          </Text3D>
        </group>
      </Center>
    </Suspense>
  );
});

ThreeDTextContent.displayName = "ThreeDTextContent";

/**
 * CanvasContent — Componente que contém a lógica do Canvas
 * useThree() é chamado aqui, DENTRO do Canvas
 */
function CanvasContent({ color }) {
  const { gl } = useThree();

  // Configurar output color space para linear (PBR)
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = THREE.SRGBColorSpace;
    }
  }, [gl]);

  return (
    <Suspense fallback={null}>
      {/* Câmera perspectiva controlada pelo useFrame */}
      <PerspectiveCamera makeDefault position={[0, -10, 8]} fov={140} />

      {/* Lighting Setup PBR */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[8, 10, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-3, 5, 5]} intensity={0.8} color={color} />
      <pointLight position={[8, -5, 5]} intensity={0.4} color="#ffffff" />

      {/* Environment HDRI */}
      <Environment preset="sunset" background={false} intensity={0.9} />

      {/* Texto 3D Volumétrico */}
    </Suspense>
  );
}

/**
 * ThreeDText — Wrapper principal com Canvas otimizado
 * Renderiza texto 3D volumétrico fixo em x=0, y=0, oscilando -130° a +130° no eixo Z
 * Câmera acompanha dinamicamente confinada aos bounds do container
 * Sem bordas — padrão consistente com VolumetricTextHero
 */
export default function ThreeDText({ 
  text = "Sobre", 
  color = "#00FFFF",
  height = "400px"
}) {
  return (
    <div className="w-full h-full overflow-hidden" style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        className="rounded-lg"
        gl={{ 
          antialias: true,
          alpha: true,
          dpr: [1, 2],
          shadowMap: { enabled: true }
        }}
        shadows
      >
        <CanvasContent color={color} />
        <ThreeDTextContent text={text} color={color} />
      </Canvas>
    </div>
  );
}