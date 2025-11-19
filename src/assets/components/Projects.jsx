import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [ 
    {
      title: "🤖 Agência Automações",
      image: "/imagens/fundo-pj-3.png",
      description: "Site do grupo de implementadores de automações para empresas, lojas, agências e escritórios. Desenvolvido com React, Typescript, TailwindCSS e GSAP"
    },
    {
      title: "🥼 Clínica Dentária",
      image: "/imagens/clinica_dental.png",
      description: "Site para clínica dentária criado em TypeScript, Tailwindcss e React"
    },
    {
      title: "🍔 Cardápio Hamburgueria",
      image: "/imagens/fundo-pj-1.png",
      description: "Cardápio Hamburgueria interativo onde o cliente pode selecionar os sanduíches clicando no ícone de carrinho, visualizar o subtotal, finalizar pedidos e contactar a hamburgueria pelo WhatsApp."
    },
    {
      title: "🌭 Hot Dog Gourm",
      image: "/imagens/fundo-pj-2.png",
      description: "Site interativo para lanchonete de hot dogs gourmet. O cliente seleciona os itens em caixinhas de seleção, verifica os itens escolhidos, subtotal, finaliza o pedido e contacta a lanchonete pelo WhatsApp."
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section   className="w-full py-20 px-4 bg-gradient-to-r from-blue-300 via-blue-400 via-blue-500 to-orange-700
                 dark:from-gray-800 dark:to-gray-900 rounded-md mb-8
                 transition-colors duration-700 transform transition-all"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-200 text-shadow-lg text-shadow-black/90 dark:text-white"> Meus Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card border-24px bg-[#EDD2B7] dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
