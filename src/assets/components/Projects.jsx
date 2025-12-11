// src/components/Projects.jsx
import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
  useTexture,
  Effects,
} from "@react-three/drei";

import { UnrealBloomPass } from "three-stdlib";
extend({ UnrealBloomPass });

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ExternalLink } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(Draggable);

// ----------------------------------------------------------------------

const projectsData = [
  {
    title: "LP Reformas & Manutenção",
    description:
      "Site para divulgação de serviços de manutenção predial e reformas.",
    emoji: "🔧",
    image: "/imagens/card_lpreformas.png",
    link: "https://lpreformas.vercel.app/",
    tags: ["React", "GSAP", "Tailwind"],
  },
  {
    title: "Agência Automações",
    description:
      "Site para divulgação de impantação de automações e captação de leads.",
    emoji: "🤖",
    image: "/imagens/fundo-pj-3.png",
    link: "https://smart-service-cegi.vercel.app/",
    tags: ["TypeScript", "GSAP"],
  },
  {
    title: "Clínica Dentária",
    description:
      "Site para divulgação de serviços odontológicos e captação de clientes.",
    emoji: "🦷",
    image: "/imagens/clinica_dental.png",
    link: "https://dental-odonto-9qbj.vercel.app/",
    tags: ["React", "Tailwind"],
  },
  {
    title: "Cardápio Hamburgueria",
    description: "Lading page e Cardapio vitual para hamburgueria.",
    emoji: "🍔",
    image: "/imagens/fundo-pj-1.png",
    link: "https://hamburgueria-tau-mauve.vercel.app/",
    tags: ["Zustand", "Tailwind"],
  },
  {
    title: "Hot Dog Gourm",
    description:
      "Aplicação de Menu virtual para autoatendimento de clientes.",
    emoji: "🌭",
    image: "/imagens/fundo-pj-2.png",
    link: "https://projeto-2-tan-eight.vercel.app/",
    tags: ["React", "GSAP"],
  },
];

// ----------------------------------------------------------------------

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  // Efeito 3D individual baseado no mouse (construção do transform por concatenação para evitar problemas de transpilação)
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y / rect.height) - 0.5) * -20;
    const rotY = ((x / rect.width) - 0.5) * 20;

    const transformStr =
      "perspective(900px) " +
      "rotateX(" +
      rotX +
      "deg) " +
      "rotateY(" +
      rotY +
      "deg) " +
      "scale(1.04)";

    card.style.transform = transformStr;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-glow card-shadow-orange bg-white/10 dark:bg-black/20 
      backdrop-blur-md rounded-xl p-4 shadow-md transition-transform duration-300 
      w-full max-w-xs transform-gpu"
      id="cards"
    >
      <div className="w-full h-40 rounded-lg overflow-hidden bg-blue-400/40 mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm text-blue-600/80 font-bold dark:text-gray-300 mb-3 leading-relaxed">
        {project.description}
      </p>

      <h3 className="text-lg font-semibold mb-1 flex items-center justify-center gap-2">
        {project.emoji} {project.title}
      </h3>

      <div className="flex justify-center gap-2 mb-4 mt-2">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs bg-purple-600/40 text-white rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-purple-600 
        hover:bg-purple-900 text-white py-2 rounded-md transition-colors duration-200"
      >
        Visitar projeto <ExternalLink size={16} />
      </a>
    </div>
  );
}

// ----------------------------------------------------------------------

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full py-20 flex flex-col items-center text-center"
    >
      <h2
        className="text-6xl font-bold text-[#FFFF00] dark:text-gray-100 
        text-shadow-lg text-shadow-neutral-100/50 mb-10 tracking-wide"
      >
        Projetos Recentes
      </h2>

      <div className="flex flex-wrap justify-center gap-8 w-full">
        {projectsData.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}
