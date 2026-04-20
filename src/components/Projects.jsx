import React, { useRef, memo } from "react";
import { ExternalLink } from "lucide-react";
import VolumetricTextHero from "./VolumetricTextHero";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const projectsData = [
  {
    id: "lp-reformas",
    title: "LP Reformas & Manutenção",
    description: "Site para divulgação de serviços de manutenção predial e reformas.",
    emoji: "🔧",
    image: "/imagens/card_lpreformas.png",
    link: "https://lpreformas.vercel.app/",
    tags: ["React", "GSAP", "Tailwind"],
  },
  {
    id: "agencia-automacoes",
    title: "Agência Automações",
    description: "Site para divulgação de implementação de automações e captação de leads.",
    emoji: "🤖",
    image: "/imagens/fundo-pj-3.png",
    link: "https://smart-service-cegi.vercel.app/",
    tags: ["TypeScript", "GSAP"],
  },
  {
    id: "clinica-dentaria",
    title: "Clínica Dentária",
    description: "Site para divulgação de serviços odontológicos e captação de clientes.",
    emoji: "🦷",
    image: "/imagens/clinica_dental.png",
    link: "https://dental-odonto-9qbj.vercel.app/",
    tags: ["React", "Tailwind"],
  },
  {
    id: "cardapio-hamburgueria",
    title: "Cardápio Hamburgueria",
    description: "Landing page e cardápio virtual para hamburgueria.",
    emoji: "🍔",
    image: "/imagens/fundo-pj-1.png",
    link: "https://hamburgueria-tau-mauve.vercel.app/",
    tags: ["Zustand", "Tailwind"],
  },
  {
    id: "hotdog-gourm",
    title: "Hot Dog Gourm",
    description: "Aplicação de menu virtual para autoatendimento de clientes.",
    emoji: "🌭",
    image: "/imagens/fundo-pj-2.png",
    link: "https://projeto-2-tan-eight.vercel.app/",
    tags: ["React", "GSAP"],
  },
  {
    id: "mkodonto",
    title: "Clínicas Odontológicas",
    description: "Site voltado à prestação de serviços a odontologistas do Rio de Janeiro.",
    emoji: "🦷",
    image: "/imagens/mkodonto_card.png",
    link: "https://mkodonto.vercel.app/",
    tags: ["React", "Tailwind"],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROJECT CARD — Memoizado para evitar re-renders
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ProjectCard = memo(({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y / rect.height) - 0.5) * -20;
    const rotY = ((x / rect.width) - 0.5) * 20;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
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
      className="group relative bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-xl p-4 
                 shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 
                 w-full max-w-xs transform-gpu"
    >
      {/* Image Container */}
      <div className="w-full h-40 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400/30 to-purple-400/30 mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Description */}
      <p className="text-sm text-cyan-300 dark:text-gray-300 mb-3 leading-relaxed line-clamp-2">
        {project.description}
      </p>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2 text-white">
        <span>{project.emoji}</span>
        <span className="truncate">{project.title}</span>
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-purple-600/50 hover:bg-purple-500/70 
                       text-white rounded-full transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-purple-600 
                   hover:bg-purple-500 text-white font-medium py-2 rounded-lg 
                   transition-colors duration-200 active:scale-95"
      >
        Visitar <ExternalLink size={16} />
      </a>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROJECTS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full py-20 md:pb-0 px-4 flex flex-col items-center text-center gap-12"
    >
      {/* Hero 3D Text */}
      <div className="w-full  ">
        <VolumetricTextHero
          className="md:w-[20vw]"
          text="Projetos"
          fontUrl="/fonts/Chonburi-Regular.json"
          textColor="#00FFFF"
          height="500px"
        />
      </div>

      {/* Projects Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}