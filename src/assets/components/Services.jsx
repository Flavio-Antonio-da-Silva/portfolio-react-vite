// C:\portfolio00\portfolio\src\assets\components\Servicos.jsx

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Importando o ícone

function Servicos() {
  return (
    <section
      id="servicos"
      className="w-full bg-gradient-to-r from-teal-500 dark:text-rose-200 rounded-md
                 transform transition-all duration-900 ease-out
                 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25
                 hover:-translate-y-1 hover:rotate-1
                 group text-xl"
    >
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 mt-20 flex flex-col items-center">
        <h2 className="text-3xl text-blue-300 md:text-4xl font-bold tracking-tight mb-6 text-center">
          Serviços
        </h2>
        {/* Conteúdo existente... */}
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          🚀 Impulsione sua presença digital com soluções sob medida!
          Sou desenvolvedor especializado na criação de sites modernos, landing pages de alta conversão, e-commerces eficientes, portfólios profissionais e páginas institucionais — tudo 100% personalizado para refletir sua marca e atingir seus objetivos.
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-blue-300 tracking-tight mb-4 text-center">
          💡 Design Responsivo e Inteligente
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Seus projetos terão layouts adaptáveis que funcionam perfeitamente em qualquer dispositivo: desktop, tablet ou smartphone. Nada de perder clientes por uma experiência ruim no mobile!
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-blue-300 tracking-tight mb-4 text-center">
          🔗 Tecnologia que conecta
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Integro APIs e bancos de dados para funcionalidades avançadas, além de aplicar estratégias de SEO que colocam seu site em destaque nos buscadores como o Google.
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-blue-300 tracking-tight mb-4 text-center">
          🎯 Experiência do Usuário em Primeiro Lugar
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Com foco em UI/UX, entrego interfaces intuitivas, rápidas e visualmente impactantes — porque um bom design não só encanta, como converte.
        </p>
        <h3 className="text-2xl text-blue-300 md:text-3xl font-bold tracking-tight mb-4 text-center">
          📈 Transforme seu negócio ou carreira
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-center px-4">
          Seja você empreendedor, profissional liberal ou criador de conteúdo, seu site será uma ferramenta poderosa para atrair clientes, gerar autoridade e crescer online.
        </p>
        <h3 className="text-2xl text-blue-300 md:text-3xl font-bold tracking-tight mb-4 text-center">
          👉 Vamos conversar?
        </h3>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <p className="text-lg leading-relaxed text-center px-4">
            Entre em contato e descubra como podemos levar sua presença digital ao próximo nível!
          </p>
          <a
            href="https://wa.me/seu-numero-aqui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          >
            {/* O componente do ícone agora é usado aqui */}
            <FaWhatsapp size={"36"} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Servicos;