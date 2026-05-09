import * as THREE from "three";
import React, { useRef, useEffect, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import gsap from "gsap";

/**
 * ThreeDTextContent — Texto 3D volumétrico com oscilação suave no eixo Z
 * Posição centralizada: x=0, y=0
 * Movimento: oscila entre -0.5 e +0.5 no eixo Z em loop contínuo
 * Responsivo: ajusta tamanho e espaçamento para mobile
 * Memoizado para evitar re-renders desnecessários
 */
const ThreeDTextContent = memo(({ text, color, isMobile }) => {
  const meshRef = useRef();
  const zPositionRef = useRef(0);
  const directionRef = useRef(1);

  // Ajusta tamanho e espaçamento responsivamente para mobile
  const responsiveSize = isMobile ? 1.2 * 0.9 : 1.2;
  const responsiveLetterSpacing = isMobile ? 0.03 : 0.08;

  // Oscilação suave no eixo Z: -0.5 a +0.5
  useFrame((state, delta) => {
    if (meshRef.current) {
      const maxZPosition = 0.5;
      const speed = 0.8; // velocidade da oscilação

      zPositionRef.current += directionRef.current * speed * delta;

      // Inverte direção ao atingir limites
      if (zPositionRef.current >= maxZPosition) {
        zPositionRef.current = maxZPosition;
        directionRef.current = -1;
      } else if (zPositionRef.current <= -maxZPosition) {
        zPositionRef.current = -maxZPosition;
        directionRef.current = 1;
      }

      meshRef.current.position.z = zPositionRef.current;
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
            size={responsiveSize}
            height={0.4}
            curveSegments={4}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.015}
            bevelOffset={0}
            bevelSegments={3}
            letterSpacing={responsiveLetterSpacing}
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
function CanvasContent({ color, isMobile }) {
  const { gl } = useThree();

  // Configurar output color space para linear (PBR)
  useEffect(() => {
    if (gl) {
      gl.outputColorSpace = THREE.SRGBColorSpace;
    }
  }, [gl]);

  // FOV muito mais aberto no mobile para enquadrar bem
  const responsiveFOV = isMobile ? 100 : 50;
  // Câmera mais distante no mobile
  const responsiveCameraZ = isMobile ? 12 : 8;

  return (
    <Suspense fallback={null}>
      {/* Câmera perspectiva responsiva */}
      <PerspectiveCamera makeDefault position={[0, 0, responsiveCameraZ]} fov={responsiveFOV} />

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
 * Renderiza texto 3D volumétrico centralizado, oscilando suavemente entre -0.5 e +0.5 no eixo Z
 * Responsivo: 90% da largura no mobile, FOV e câmera dinâmicos
 * Sem vazamento lateral — padrão consistente com VolumetricTextHero
 */
export default function ThreeDText({ 
  text = "Sobre", 
  color = "#00FFFF",
  height = "400px"
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Detecta se é mobile (viewport < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div 
      className="flex items-center justify-center w-full md:w-full"
      style={{ 
        height,
        maxWidth: "100%"
      }}
    >
      <div 
        className="w-11/12 md:w-full overflow-hidden rounded-lg" 
        style={{ 
          height: "100%"
        }}
      >
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
          <CanvasContent color={color} isMobile={isMobile} />
          <ThreeDTextContent text={text} color={color} isMobile={isMobile} />
        </Canvas>
      </div>
    </div>
  );
}