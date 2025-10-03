// ThreeDText.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";

// Componente interno que vai dentro do <Canvas>
function ThreeDTextContent({ text, color }) {
  const mesh = useRef();

  // Rotação contínua
  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.3;
  });

  // Animação GSAP no mount
  useEffect(() => {
    if (mesh.current) {
      gsap.fromTo(
        mesh.current.position,
        { y: -2, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <Text
      ref={mesh}
      fontSize={0.8}       // Tamanho base do texto
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={6}         // Largura máxima do texto
    >
      {text}
    </Text>
  );
}

// Wrapper principal que você importa no App.jsx
export default function ThreeDText({ text, color }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Luz ambiente */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Texto 3D */}
      <ThreeDTextContent text={text} color={color} />
    </Canvas>
  );
}
