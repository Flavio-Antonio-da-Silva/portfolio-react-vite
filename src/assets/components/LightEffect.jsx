import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LightEffect = () => {
  const lightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Anima a 'luz' para a posição do cursor
      gsap.to(lightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5, // Duração da animação para um efeito suave
        ease: 'power3.out', // Tipo de suavização
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '50px',
        height: '50px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none', // Garante que a div não interfira com outros elementos
        transform: 'translate(-50%, -50%)', // Centraliza a div no cursor
        zIndex: 9999, // Mantém a div no topo
      }}
    />
  );
};

export default LightEffect;