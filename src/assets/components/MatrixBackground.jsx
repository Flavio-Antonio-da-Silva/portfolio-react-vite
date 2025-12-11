import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MatrixBackground({ isDarkMode, speed = 1 }) {
  const canvasRef = useRef(null);
  const colorsRef = useRef({
    bg: "rgba(0, 124, 0.7)", // começa como light
    text: "#6b0d52ff",
  });

  // Paletas de cores
  const bgDark = "rgba(20, 40, 60, 0.7)";
  const bgLight = "rgba(85, 107, 62, 0.6)";
  const textDark = "#13E191"; // neon
  const textLight = "#006400"; // musgo discreto

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = colorsRef.current.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colorsRef.current.text;
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = 0.99;

      drops.forEach((y, index) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = index * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        // 🔹 velocidade controlada pela prop
        drops[index] += speed;
      });

      ctx.globalAlpha = 1.0;
    }

    const ticker = gsap.ticker.add(() => draw());

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed]); // dependência aqui!

  useEffect(() => {
    const targetColors = {
      bg: isDarkMode ? bgDark : bgLight,
      text: isDarkMode ? textDark : textLight,
    };

    gsap.to(colorsRef.current, {
      bg: targetColors.bg,
      text: targetColors.text,
      duration: 0.7,
      ease: "power2.inOut",
    });
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full transition-colors duration-700"
    />
  );
}