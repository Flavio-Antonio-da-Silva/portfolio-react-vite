import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
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

function MatrixColumn({ x, speed, delay, textColor, count }) {
  const groupRef = useRef();

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
  }, [textColor, count]);

  return (
    <group ref={groupRef} position={[x, 18 + delay, 0]}>
      {texts}
    </group>
  );
}

function useResponsiveConfig() {
  const [config, setConfig] = useState({
    isMobile: false,
    columns: 32,
    charCount: 18,
    parallaxStrength: 2.2,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;

      setConfig({
        isMobile,
        columns: isMobile ? 18 : 38,
        charCount: isMobile ? 12 : 18,
        parallaxStrength: isMobile ? 1.2 : 2.2,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

function MatrixRain({ speedMultiplier, textColor, followRef, config }) {
  const { columns, charCount } = config;

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
            count={charCount}
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
  const config = useResponsiveConfig();

  useEffect(() => {
    const move = (xNorm, yNorm) => {
      if (!followGroupRef.current) return;

      gsap.to(followGroupRef.current.position, {
        x: xNorm * config.parallaxStrength,
        y: yNorm * config.parallaxStrength,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      move(x, y);
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = -(touch.clientY / window.innerHeight) * 2 + 1;
      move(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [config.parallaxStrength]);

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
      <Canvas
        dpr={[1, config.isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 22], fov: 60 }}
      >
        <color attach="background" args={[palette.canvas]} />

        <MatrixRain
          speedMultiplier={speed}
          textColor={palette.text}
          followRef={followGroupRef}
          config={config}
        />
      </Canvas>
    </div>
  );
}
