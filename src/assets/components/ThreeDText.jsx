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

  // GSAP: animação de entrada
  useEffect(() => {
    if (mesh.current) {
      gsap.fromTo(
        mesh.current.position,
        { y: -2 },
        { y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        mesh.current.scale,
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }, []);

  // GSAP: efeito hover
  const handlePointerOver = () => {
    if (mesh.current) {
      gsap.to(mesh.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
    }
  };

  const handlePointerOut = () => {
    if (mesh.current) {
      gsap.to(mesh.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
  };

  return (
    <Text
      ref={mesh}
      fontSize={0.8}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={6}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
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
