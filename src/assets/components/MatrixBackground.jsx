// src/assets/components/MatrixBackground.jsx
import React, { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ajusta o tamanho inicial
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters =
      "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
        ""
      );

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).map(() => 1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // cria o rastro
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // verde Matrix
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0; // reinicia a "chuva"
        }
        drops[i] += 2;
      }
    }

    const interval = setInterval(draw, 50);

    // Redimensiona ao mudar a tela
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full bg-black"
    />
  );
}
