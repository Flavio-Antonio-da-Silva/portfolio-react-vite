import React, { useEffect, useState } from "react";

/**
 * MinhaImagem — Componente de foto de perfil
 * Renderiza apenas no mobile (viewport < 768px)
 * Utiliza classes Tailwind para estilo responsivo
 * Imagem circular (rounded-full)
 */
export default function MinhaImagem() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é mobile (viewport < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Renderiza apenas no mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mb-8">
      <img
        src="/imagens/foto_perfil_pot.png"
        alt="Foto de perfil"
        className="w-full h-full md:w-48 md:h-48 rounded-r-full object-cover shadow-lg"
      />
    </div>
  );
}