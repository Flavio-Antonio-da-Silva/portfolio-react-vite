import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

/**
 * VolumetricTextCore — Núcleo do texto 3D com oscilação suave no eixo Z
 * Posição centralizada: x=0, y=0
 * Movimento: oscila entre -1.0 e +1.0 no eixo Z em loop contínuo
 * Responsivo: ajusta tamanho para mobile (até 90% da largura)
 * Câmera fixa para melhor controle visual
 * Memoizado para evitar re-renders desnecessários
 */
const VolumetricTextCore = React.memo(({ 
  text = "Flávio", 
  fontUrl = "/fonts/Chonburi-Regular.json",
  size = 10,
  depth = 0.3,
  color = "#00FFFF",
  roughness = 0.4,
  metalness = 0.7,
  isMobile = false
}) => {
  const meshRef = useRef(null);
  const zPositionRef = useRef(0);
  const directionRef = useRef(1);

  // Ajusta tamanho responsivamente para mobile
  const responsiveSize = isMobile ? size * 0.5 : size;

  /**
   * Loop de animação — executa a cada frame
   * Oscilação suave no eixo Z: -1.0 a +1.0
   */
  useFrame((state, delta) => {
    if (meshRef.current) {
      const maxZPosition = 1.0;
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

  return (
    <Suspense fallback={null}>
      <Center top>
        <group ref={meshRef} position={[0, 0, 8]}>
          <Text3D
            font={fontUrl}
            size={responsiveSize}
            height={depth}
            curveSegments={8}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.015}
            bevelOffset={0}
            bevelSegments={3}
            letterSpacing={0.05}
            castShadow
            receiveShadow
          >
            {text}
            <meshStandardMaterial
              color={color}
              roughness={roughness}
              metalness={metalness}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </Text3D>
        </group>
      </Center>
    </Suspense>
  );
});

VolumetricTextCore.displayName = "VolumetricTextCore";

/**
 * Scene — Cena 3D completa com lighting, ambiente e câmera responsiva
 */
function VolumetricScene({ text, fontUrl, textColor, isMobile }) {
  const { gl } = useThree();

  // Configurar output color space para linear (PBR)
  React.useEffect(() => {
    if (gl) {
      gl.outputColorSpace = THREE.SRGBColorSpace;
    }
  }, [gl]);

  // FOV responsivo: maior no mobile para enquadrar melhor
  const responsiveFOV = isMobile ? 25 : 15;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={responsiveFOV} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[0, 0, 0]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#00FFFF" />

      {/* Environment HDRI */}
      <Environment preset="sunset" background={false} intensity={0.8} />

      {/* Text 3D Component */}
      <VolumetricTextCore 
        text={text}
        fontUrl={fontUrl}
        color={textColor}
        size={0.8}
        depth={0.3}
        roughness={0.35}
        metalness={0.75}
        isMobile={isMobile}
      />
    </>
  );
}

/**
 * VolumetricTextHero — Wrapper para Canvas com controle externo
 * Texto centralizado oscilando suavemente no eixo Z
 * Responsivo: 90% da largura no mobile
 * Props:
 *  - text: string a renderizar
 *  - fontUrl: caminho para arquivo .json (Three.js TextGeometry)
 *  - textColor: cor do texto (hex ou named color)
 *  - height: altura do container (default: 400px)
 */
export default function VolumetricTextHero({ 
  text = "Flávio", 
  fontUrl = "/fonts/Chonburi-Regular.json",
  textColor = "#00FFFF",
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
          gl={{ 
            antialias: true,
            alpha: true,
            dpr: [1, 2],
            shadowMap: { enabled: true }
          }}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg"
        >
          <Suspense fallback={null}>
            <VolumetricScene 
              text={text}
              fontUrl={fontUrl}
              textColor={textColor}
              isMobile={isMobile}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}