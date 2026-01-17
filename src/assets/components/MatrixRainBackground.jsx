import React, { useEffect, useRef } from 'react';

const MatrixRainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajusta o tamanho do canvas para ocupar a tela inteira
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Caracteres do Matrix (Katakana japonês + números + símbolos)
    const characters = 'ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFHIJKLMNOPQRSTUVWXYZ';
    const charArray = characters.split('');

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Array para manter a posição Y de cada coluna
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Começa em posições aleatórias acima do topo
    }

    const draw = () => {
      // Cria um efeito de rastro (motion blur) pintando um retângulo semi-transparente
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Define a cor e fonte dos caracteres
      ctx.fillStyle = '#0F0'; // Verde Matrix clássico
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Seleciona um caractere aleatório
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Desenha o caractere
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Adiciona um brilho ocasional para caracteres específicos
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#fff'; // Caractere branco brilhante
        } else {
            ctx.fillStyle = '#0F0';
        }

        ctx.fillText(text, x, y);

        // Reseta a gota quando ela sai da tela ou aleatoriamente após atingir o fundo
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Incrementa a posição da gota
        drops[i]++;
      }
    };

    // Loop de animação
    const interval = setInterval(draw, 33); // Aproximadamente 30 FPS para o estilo "retrô"

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ display: 'block' }}
    />
  );
};

export default MatrixRainBackground;