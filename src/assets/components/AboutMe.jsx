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
        className="max-w-4xl mx-auto px-6 py-16 md:py-20 mt-20 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center">
          Sobre mim
        </h2>

        {/* Imagem do rosto */}
        <img
          src="/imagens/para_port5.png" // Caminho CORRETO para a pasta public
          alt="Foto de Flávio"
          className="w-80 h-60 object-cover rounded-full shadow-lg mb-8 border-4 border-white dark:border-gray-800"
        />

        {/* Novo texto da seção "Sobre mim" */}
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Oieee, prazer em conhecê-lo! Muito bom ter você por aqui. Me chamo <strong ClassName= "font-sans">Flávio Antônio</strong>, sou natural do Rio de Janeiro. Comecei muito cedo no mundo da tecnologia. Como um curioso entusiasmado que precisava conhecer sobre o funcionamento de todos os software e hardware (ainda sou rs).
        </p>
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Associei minha paixão por tecnologia à minha antiga função como técnico contábil criando sites e aplicações web para otimizar meu desempenho profissional. E nos últimos dois anos, decidi fazer uma migração de carreira para que o desenvolvimento web deixasse de ser somente um hobby para se tornar 1ª profissão.
        </p>
        <p className="text-lg leading-relaxed text-center px-4">
          Atualmente trabalho como freelancer desenvolvendo aplicações para empreendedores e parceiros no mundo da tecnologia. E aí? Vamos seguir juntos nessa trajetória😉?
        </p>
      </div>
    </section>
  );
}