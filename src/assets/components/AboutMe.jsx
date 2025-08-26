import React from "react";

export default function AboutMe() {
  return (
    <section
      className="w-full bg-gradient-to-r from-blue-500 to-blue-900 dark:text-gray-200 rounded-md 
                 transform transition-all duration-700 ease-out
                 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25
                 hover:-translate-y-1 hover:rotate-1
                 group cursor-pointer"
    >
      <div
        id="sobre"
        className="max-w-4xl mx-auto px-6 py-16 md:py-20 mt-20 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center">
          Sobre mim
        </h2>

        {/* Imagem do rosto */}
        <img
          src="/imagens/para_port5.png" // Caminho CORRETO para a pasta public
          alt="Foto de Flávio"
          className="w-40 h-40 object-cover rounded-full shadow-lg mb-8 border-4 border-white dark:border-gray-800"
        />

        <p className="text-lg leading-relaxed mb-4 text-left">
          Comecei minha jornada na tecnologia aos 25 anos, quase sem perceber que
          aquele hobby para ajudar em projetos de contabilidade mudaria
          completamente minha trajetória.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-left">
          Descobri no front-end uma paixão genuína por criar, transformar e dar
          vida a ideias.
        </p>

        <p className="text-lg leading-relaxed text-left">
          Há 2 anos atuo como desenvolvedor, focado em apoiar pequenos e médios
          empreendedores a terem mais presença na internet e a escalarem seus
          negócios com soluções criativas e acessíveis.
        </p>
      </div>
    </section>
  );
}