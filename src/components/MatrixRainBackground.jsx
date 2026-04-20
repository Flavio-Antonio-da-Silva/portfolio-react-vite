import React, { useEffect, useRef, useState } from 'react';

const MatrixRainBackground = ({ isDarkMode, speed = 0.18 }) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajusta o tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Captura o movimento do mouse para o Parallax
    const handleMouseMove = (e) => {
      // Normaliza os valores entre -1 e 1 para o efeito de deslocamento
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // Move até 20px
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    const characters = 'ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF';
    const charArray = characters.split('');
    
    const fontSize = window.innerWidth < 768 ? 12 : 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      const bgColor = isDarkMode ? 'rgba(5, 8, 13, 0.1)' : 'rgba(192, 192, 192, 0.1)';
      const textColor = '#22c55e'; 

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillStyle = Math.random() > 0.95 ? (isDarkMode ? '#fff' : '#1e293b') : textColor;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalTime = 33 / speed;
    const interval = setInterval(draw, intervalTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-[110vw] h-[110vh] -z-10 transition-colors duration-500 pointer-events-none"
      style={{ 
        backgroundColor: isDarkMode ? "#05080d" : "#c0c0c0",
        display: 'block',
        // O Parallax: movemos o canvas na direção oposta ao mouse levemente
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.1)`,
        left: '-5vw', // Margem extra para não ver as bordas ao mover
        top: '-5vh'
      }}
    />
  );
};

export default MatrixRainBackground;