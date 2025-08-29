import React from "react";

export default function Projects() {
  return (
    <section
      id="projetos"
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-md 
                 transform transition-all duration-700 ease-out
                 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25
                 hover:-translate-y-1 hover:rotate-1
                 group mb-8" // Adicionado mb-8 para espaçamento consistente
    >
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center">
          Projetos
        </h2>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projeto Hamburgueria */}
          <div 
            className="relative p-6 bg-cover bg-center rounded-xl shadow-lg flex flex-col justify-between"
            style={{ 
              backgroundImage: 'url("/imagens/fundo-pj-1.png")', // Caminho relativo à pasta `public`
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco semi-transparente para o modo claro
              backgroundBlendMode: 'overlay' // Mistura o background-color com a imagem
            }}
          >
            {/* Overlay para o modo escuro, garantindo legibilidade */}
            <div className="absolute inset-0 bg-black opacity-0 dark:opacity-50 rounded-xl transition-opacity duration-300"></div>
            
            <div className="relative z-10 text-gray-900 dark:text-gray-100"> {/* Garante que o conteúdo fique acima do overlay */}
              <h3 className="text-2xl font-semibold mb-3">🍔 Hamburgueria Online</h3>
              <p className="mb-4">
                Cardápio interativo onde o cliente pode selecionar os sanduíches clicando
                no ícone de carrinho, visualizar o subtotal, finalizar pedidos e contactar
                a hamburgueria pelo WhatsApp. Criado para facilitar os pedidos online de uma hamburgueria.
              </p>
            </div>
            <div className="flex justify-between mt-4 relative z-10">
              <a
                href="https://hamburgueria-mh9hlyshz-flavio-antonio-da-silvas-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Ver Projeto
              </a>
            </div>
          </div>

          {/* Projeto Hot Dogs Gourmet */}
          <div 
            className="relative p-6 bg-cover bg-center rounded-xl shadow-lg flex flex-col justify-between"
            style={{ 
              backgroundImage: 'url("/imagens/fundo-pj-2.png")', // Caminho relativo à pasta `public`
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco semi-transparente para o modo claro
              backgroundBlendMode: 'overlay' // Mistura o background-color com a imagem
            }}
          >
            {/* Overlay para o modo escuro, garantindo legibilidade */}
            <div className="absolute inset-0 bg-black opacity-0 dark:opacity-50 rounded-xl transition-opacity duration-300"></div>
            
            <div className="relative z-10 text-gray-900 dark:text-gray-100"> {/* Garante que o conteúdo fique acima do overlay */}
              <h3 className="text-2xl font-semibold mb-3">🌭 Hot Dogs Gourmet</h3>
              <p className="mb-4">
                Site interativo para lanchonete de hot dogs gourmet. O cliente seleciona os itens 
                em caixinhas de seleção, verifica os itens escolhidos, subtotal, finaliza o pedido
                e contacta a lanchonete pelo WhatsApp.
              </p>
            </div>
            <div className="flex justify-between mt-4 relative z-10">
              <a
                href="https://projeto-2-tan-eight.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Ver Projeto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
