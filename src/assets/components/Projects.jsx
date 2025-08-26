// C:\Users\Flavio\OneDrive\Documentos\portfo.git\repositorio01\portfolio01\portfolio\src\assets\components\Projects.jsx
import React from "react";

export default function Projects() {
  return (
    <section
      id="projetos"
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-md 
                 transform transition-all duration-700 ease-out
                 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25
                 hover:-translate-y-1 hover:rotate-1
                 group"
    >
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center">
          Projetos
        </h2>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projeto Hamburgueria */}
          <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-3">🍔 Hamburgueria Online</h3>
              <p className="mb-4">
                Cardápio interativo onde o cliente pode selecionar os sanduíches clicando
                no ícone de carrinho, visualizar o subtotal, finalizar pedidos e contactar
                a hamburgueria pelo WhatsApp. Criado para facilitar os pedidos online de uma hamburgueria.
              </p>
            </div>
            <div className="flex justify-between mt-4">
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
          <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-3">🌭 Hot Dogs Gourmet</h3>
              <p className="mb-4">
                Site interativo para lanchonete de hot dogs gourmet. O cliente seleciona os itens 
                em caixinhas de seleção, verifica os itens escolhidos, subtotal, finaliza o pedido
                e contacta a lanchonete pelo WhatsApp.
              </p>
            </div>
            <div className="flex justify-between mt-4">
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