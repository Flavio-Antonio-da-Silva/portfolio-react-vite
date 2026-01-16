import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { gsap } from "gsap";

const chars =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyz0123456789"
    .split("");

// 🎨 Paleta centralizada
const COLORS = {
  dark: {
    background: "#05080d",
    canvas: "#05080d",
    text: "#00ff6a",
  },
  light: {
    background: "#C0C0C0",
    canvas: "#C0C0C0",
    text: "#065f46",
  },
};

function MatrixColumn({ x, speed, delay, textColor }) {
  const groupRef = useRef();
  const count = 18;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.position.y -= speed * delta;
    if (groupRef.current.position.y < -18) {
      groupRef.current.position.y = 18;
    }
  });

  const texts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const opacity = 1 - i / count;
      const char = chars[Math.floor(Math.random() * chars.length)];

      return (
        <Text
          key={i}
          position={[0, i * 0.8 - (count * 0.8) / 2, 0]}
          fontSize={0.55}
          color={textColor}
          fillOpacity={i === 0 ? 1 : opacity}
          anchorX="center"
          anchorY="middle"
        >
          {char}
        </Text>
      );
    });
  }, [textColor]);

  return (
    <group ref={groupRef} position={[x, 18 + delay, 0]}>
      {texts}
    </group>
  );
}

function MatrixRain({ speedMultiplier = 1, textColor, followRef }) {
  const columns = 38;

  return (
    <group ref={followRef}>
      {Array.from({ length: columns }, (_, i) => {
        const x = (i - columns / 2) * 1.2;
        const speed = (3 + Math.random() * 2) * speedMultiplier;
        const delay = Math.random() * 10;

        return (
          <MatrixColumn
            key={i}
            x={x}
            speed={speed}
            delay={delay}
            textColor={textColor}
          />
        );
      })}
    </group>
  );
}

export default function MatrixRainBackground({
  isDarkMode,
  speed = 0.5,
}) {
  const palette = isDarkMode ? COLORS.dark : COLORS.light;
  const followGroupRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!followGroupRef.current) return;

      // Normaliza mouse entre -1 e 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Intensidade do deslocamento (sensação de parallax)
      const strength = 2.2;

      gsap.to(followGroupRef.current.position, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: palette.background,
        transition: "background 1.8s ease",
      }}
    >
      <Canvas camera={{ position: [0, 0, 22], fov: 60 }}>
        <color attach="background" args={[palette.canvas]} />

        <MatrixRain
          speedMultiplier={speed}
          textColor={palette.text}
          followRef={followGroupRef}
        />
      </Canvas>
    </div>
  );
}
