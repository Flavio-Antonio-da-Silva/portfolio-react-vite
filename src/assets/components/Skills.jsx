import React from "react";

export default function Skills() {
  return (
    <section 
      id="habilidades" 
      className="w-full py-16 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                 transform transition-all duration-700 ease-out 
                 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 
                 hover:-translate-y-1 hover:rotate-1 group rounded-md mb-8" // Adicionei rounded-md e mb-8 para consistência
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600 dark:text-blue-400">
          Minhas Habilidades
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            "HTML5",
            "CSS3",
            "JavaScript",
            "React",
            "Node.js",
            "Git",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Vercel",
            "Github",
            "Figma" 
          ].map((skill, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg shadow-md 
                         bg-gradient-to-r from-indigo-500 to-purple-700 text-white // Gradiente para cada item
                         transform transition-all duration-300 ease-out 
                         hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 // Sombra e escala no hover
                         flex items-center justify-center text-center
                         group-hover:rotate-0 group-hover:scale-100" // Resetar rotação e escala no hover do grupo
            >
              <p className="text-xl font-semibold">{skill}</p>
              {/* Elementos de fundo para o efeito visual, se desejar */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
