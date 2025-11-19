import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [
    {
      title: "🤖 Agência Automações",
      image: "/imagens/fundo-pj-3.png",
      description: "Site do grupo de implementadores de automações para empresas, lojas, agências e escritórios. Desenvolvido com React, Typescript, TailwindCSS e GSAP",
      link: "https://smart-service-cegi.vercel.app/"
    },
    {
      title: "🥼 Clínica Dentária",
      image: "/imagens/clinica_dental.png",
      description: "Site para clínica dentária criado em TypeScript, Tailwindcss e React",
      link: "https://dental-odonto-9qbj.vercel.app/"
    },
    {
      title: "🍔 Cardápio Hamburgueria",
      image: "/imagens/fundo-pj-1.png",
      description: "Cardápio Hamburgueria interativo onde o cliente pode selecionar os sanduíches clicando no ícone de carrinho, visualizar o subtotal, finalizar pedidos e contactar a hamburgueria pelo WhatsApp.",
      link: "https://hamburgueria-tau-mauve.vercel.app/"
    },
    {
      title: "🌭 Hot Dog Gourm",
      image: "/imagens/fundo-pj-2.png",
      description: "Site interativo para lanchonete de hot dogs gourmet. O cliente seleciona os itens em caixinhas de seleção, verifica os itens escolhidos, subtotal, finaliza o pedido e contacta a lanchonete pelo WhatsApp.",
      link: "https://projeto-2-tan-eight.vercel.app/"
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
            <div key={index} className="project-card border-8 border-solid  bg-[#EDD2B7] dark:bg-gray-800 rounded-[2vw]  overflow-hidden hover:shadow-xl transition-shadow duration-300" style={{ boxShadow: '0 25px 50px -12px rgba(160, 32, 240, 0.25), 0 10px 10px -5px rgba(160, 32, 240, 0.04)' }}>
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="ring-4 inline-block rounded-full mt-4 px-4 py-2 bg-[#9400D3] text-white hover:bg-blue-600 transition-colors">Acessar ao site</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
