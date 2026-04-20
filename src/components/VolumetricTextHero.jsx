import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

/**
 * VolumetricTextCore — Núcleo do texto 3D com rotação sincronizada
 * Movimento sincronizado: 180° no eixo X + 120° no eixo Z
 * Câmera orbita com restrição de bounds ao container
 * Memoizado para evitar re-renders desnecessários
 */
const VolumetricTextCore = React.memo(({ 
  text = "Flávio", 
  fontUrl = "/fonts/Chonburi-Regular.json",
  size = 10,
  depth = 0.3,
  color = "#00FFFF",
  roughness = 0.4,
  metalness = 0.7
}) => {
  const meshRef = useRef(null);
  const timeRef = useRef(0);

  // Bounds de clipping para restringir ao viewport
  const BOUNDS = {
    x: { min: -2.5, max: 2.5 },
    y: { min: -2.0, max: 2.0 },
    z: { min: -2.5, max: 3.5 }
  };

  /**
   * Função auxiliar para clampar valores dentro dos bounds
   */
  const clampToBounds = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  };

  /**
   * Loop de animação — executa a cada frame
   * Rotação sincronizada em onda senoidal + câmera dinâmica confinada
   */
  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta * 0.25; // Controla velocidade global

      // Rotação X: 180° (π radianos) indo e voltando
      meshRef.current.rotation.x = Math.sin(timeRef.current) * Math.PI;

      // Rotação Z: 120° (2.09 radianos) indo e voltando
      meshRef.current.rotation.z = Math.sin(timeRef.current * 0.67) * (Math.PI * 2 / 3);

      // Rotação Y suave adicional para dinamismo
      meshRef.current.rotation.y = Math.cos(timeRef.current * 0.3) * (Math.PI / 6);

      // Câmera com movimento confinado aos bounds
      const targetX = Math.sin(timeRef.current) * 2.0; // Amplitude reduzida
      const targetY = Math.cos(timeRef.current * 0.67) * 1.5; // Amplitude reduzida
      const targetZ = 5 + Math.sin(timeRef.current * 0.5) * 1.2; // Amplitude reduzida

      // Aplicar clamping para garantir permanência dentro dos bounds
      state.camera.position.x = clampToBounds(targetX, BOUNDS.x.min, BOUNDS.x.max);
      state.camera.position.y = clampToBounds(targetY, BOUNDS.y.min, BOUNDS.y.max);
      state.camera.position.z = clampToBounds(targetZ, BOUNDS.z.min, BOUNDS.z.max);

      state.camera.lookAt (0, 0, 0);
    }
  });

  return (
    <Suspense fallback={null}>
      <Center top>
        <group ref={meshRef}>
          <Text3D
            font={fontUrl}
            size={size}
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
 * Scene — Cena 3D completa com lighting, ambiente e câmera restrita
 */
function VolumetricScene({ text, fontUrl, textColor }) {
  const { gl } = useThree();

  // Configurar output color space para linear (PBR)
  React.useEffect(() => {
    if (gl) {
      gl.outputColorSpace = THREE.SRGBColorSpace;
    }
  }, [gl]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={120} />

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
      />
    </>
  );
}

/**
 * VolumetricTextHero — Wrapper para Canvas com controle externo
 * Câmera restrita aos bounds do container
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
  return (
    <div className="w-full h-full overflow-hidden" style={{ height }}>
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
          />
        </Suspense>
      </Canvas>
    </div>
  );
}