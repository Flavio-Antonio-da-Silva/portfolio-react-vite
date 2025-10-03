import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    // Adicionando ID único
    id: "burger", 
    title: "🍔 Hamburgueria Online",
    description:
      "Cardápio interativo onde o cliente pode selecionar os sanduíches clicando no ícone de carrinho, visualizar o subtotal, finalizar pedidos e contactar a hamburgueria pelo WhatsApp.",
    image: "/imagens/fundo-pj-1.png",
    link: "https://hamburgueria-mh9hlyshz-flavio-antonio-da-silvas-projects.vercel.app/",
  },
  {
    // Adicionando ID único
    id: "hotdog",
    title: "🌭 Hot Dogs Gourmet",
    description:
      "Site interativo para lanchonete de hot dogs gourmet. O cliente seleciona os itens em caixinhas de seleção, verifica os itens escolhidos, subtotal, finaliza o pedido e contacta a lanchonete pelo WhatsApp.",
    image: "/imagens/fundo-pj-2.png",
    link: "https://projeto-2-tan-eight.vercel.app/",
  },
  {
    // Adicionando ID único
    id: "automacoes",
    title: "🤖 Agência Automações",
    description:
      "Site do grupo de implementadores de automações para empresas, lojas, agências e escritórios. Desenvolvido com React, Typescript, TailwindCSS e GSAP.",
    image: "/imagens/fundo-pj-3.png",
    link: "https://smart-service-gamma.vercel.app/",
  },
];

export default function Projects() {
  useEffect(() => {
    const cards = gsap.utils.toArray(".project-card");

    gsap.fromTo(
      "#projects-title",
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#projetos",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: "#projetos",
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="projetos"
      className="w-full py-20 bg-gradient-to-r from-indigo-500 text-gray-900 rounded-md 
                   transform transition-all duration-700 ease-out mb-8"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 mt-20">
        <h2
          id="projects-title"
          className="text-3xl md:text-4xl text-[#1f0783] font-bold tracking-tight mb-10 text-center"
        >
          Projetos
        </h2>

        {/* Grid dinâmica de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card relative p-4 md:p-6 bg-cover bg-center rounded-xl shadow-lg flex flex-col justify-between 
                          group overflow-hidden transform transition duration-500 
                          hover:scale-105"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            >
              {/* Overlay de contraste fixo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                               dark:from-black/80 dark:via-black/50 dark:to-transparent 
                               rounded-xl transition duration-500 ease-in-out"></div>

              {/* Conteúdo com texto legível */}
              <div className="relative z-10 ">
                {/* O ID do projeto é usado para criar uma classe CSS única para o título.
                  Ex: "burger-title"
                */}
                <h3 className={`text-xl md:text-2xl font-roboto mb-3 drop-shadow-lg ${project.id}-title`}>
                  {project.title}
                </h3>
                {/* O ID do projeto é usado para criar uma classe CSS única para a descrição.
                  Ex: "burger-description"
                */}
                <p className={`mb-4 text-sm md:text-base leading-relaxed drop-shadow-md ${project.id}-description`}>
                  {project.description}
                </p>
              </div>

              {/* Botão */}
              <div className="flex justify-between mt-4 relative z-10"> 
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver projeto ${project.title}`}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                                 text-white font-medium transition transform hover:scale-105 
                                 shadow-md hover:shadow-lg active:scale-95"
                >
                  Ver Projeto
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}