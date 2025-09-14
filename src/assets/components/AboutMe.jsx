import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)", // md+
          isMobile: "(max-width: 767px)", // até sm
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            gsap.fromTo(
              imgRef.current,
              { y: 200, opacity: 0 },
              {
                x: 30,
                opacity: 1,
                duration: 1.8,
                ease: "power1.inOut",
                scrollTrigger: {
                  trigger: imgRef.current,
                  start: "top 80%",
                },
              }
            );
          }

          if (isMobile) {
            gsap.fromTo(
              imgRef.current,
              { y: 150, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: imgRef.current,
                  start: "top 85%",
                },
              }
            );
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="sobre-mim"
      className="w-full bg-gradient-to-r from-blue-300 dark:text-gray-900 rounded-md 
                 transform transition-all duration-900 ease-out
                 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25
                 hover:-translate-y-1 hover:rotate-1
                 group cursor-pointer text-xl"
    >
      <div
        className="max-w-5xl mx-auto px-6 py-16 md:py-20 mt-20 
                   flex flex-col-reverse md:flex-row items-center md:items-start gap-8"
      >
        {/* Texto da seção */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center md:text-left">
            Sobre mim
          </h2>

          <p className="text-lg leading-relaxed mb-4 px-2 md:px-0">
            Oieee, prazer em conhecê-lo! Muito bom ter você por aqui. Me chamo{" "}
            <strong className="font-sans">Flávio Antônio</strong>, sou natural
            do Rio de Janeiro. Comecei muito cedo no mundo da tecnologia. Como
            um curioso entusiasmado que precisava conhecer sobre o funcionamento
            de todos os software e hardware (ainda sou rs).
          </p>

          <p className="text-lg leading-relaxed mb-4 px-2 md:px-0">
            Associei minha paixão por tecnologia à minha antiga função como
            técnico contábil criando sites e aplicações web para otimizar meu
            desempenho profissional. E nos últimos dois anos, decidi fazer uma
            migração de carreira para que o desenvolvimento web deixasse de ser
            somente um hobby para se tornar 1ª profissão.
          </p>

          <p className="text-lg leading-relaxed px-2 md:px-0">
            Atualmente trabalho como freelancer desenvolvendo aplicações para
            empreendedores e parceiros no mundo da tecnologia. E aí? Vamos
            seguir juntos nessa trajetória😉?
          </p>
        </div>

        {/* Imagem do rosto */}
        <div className="flex-shrink-0">
          <img
            ref={imgRef}
            id="foto-rosto"
            src="/imagens/para_port5.png"
            alt="Foto de Flávio"
            className="transition-transform duration-900 
                       w-100 h-80 object-cover rounded-md shadow-lg 
                       border-0 border-white dark:border-gray-800"
          />
        </div>
      </div>
    </section>
  );
}
