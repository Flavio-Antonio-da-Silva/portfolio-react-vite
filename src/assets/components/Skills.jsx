import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { SiTypescript, SiVite, SiTailwindcss, SiVercel } from 'react-icons/si';

export default function Skills() {
  const skills = [
    { name: "HTML5", icon: <FaHtml5 className="text-5xl" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-5xl" /> },
    { name: "JavaScript", icon: <IoLogoJavascript className="text-5xl" /> },
    { name: "React", icon: <FaReact className="text-5xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-5xl" /> },
    { name: "Git", icon: <FaGitAlt className="text-5xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-5xl" /> },
    { name: "Vite", icon: <SiVite className="text-5xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-5xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-5xl" /> },
    { name: "Github", icon: <FaGithub className="text-5xl" /> },
    { name: "Figma", icon: <FaFigma className="text-5xl" /> }
  ];

  return (
    <section 
      id="habilidades" 
      className="w-full py-20 px-4 bg-gradient-to-r from-blue-400   dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                 transform transition-all duration-700 ease-out 
                 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 
                 hover:-translate-y-1 hover:rotate-1 group rounded-md mb-8" // Adicionei rounded-md e mb-8 para consistência
    >
      <div className="container mx-auto">
        <h2 className="text-4xl text-[#1f0783] font-extrabold text-center mb-10  dark:text-white-300">
          Minhas Habilidades
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg shadow-md 
                         bg-gradient-to-r from-indigo-500 to-purple-700 text-white // Gradiente para cada item
                         transform transition-all duration-300 ease-out 
                         hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 // Sombra e escala no hover
                         flex flex-col items-center justify-center text-center
                         group-hover:rotate-0 group-hover:scale-100" // Resetar rotação e escala no hover do grupo
            >
              {skill.icon}
              <p className="text-xl font-semibold mt-2">{skill.name}</p>
              {/* Elementos de fundo para o efeito visual, se desejar */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
