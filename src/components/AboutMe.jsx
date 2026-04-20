// src/assets/components/AboutMe.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
          },
        });

        if (isDesktop) {
          timeline.fromTo(
            imgRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
          );
          timeline.fromTo(
            textRef.current,
            { y: 50, opacity: 0, rotationX: -90 },
            { 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              duration: 1.2, 
              ease: "power3.out",
              transformOrigin: "center center",
              perspective: 1200
            },
            "<0.3"
          );
        }

        if (isMobile) {
          timeline.fromTo(
            imgRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
          );
          timeline.fromTo(
            textRef.current,
            { y: 30, opacity: 0, rotationX: -90 },
            { 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              duration: 1, 
              ease: "power2.out",
              transformOrigin: "center center",
              perspective: 1200
            },
            "<0.2"
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="sobre-mim"
      className="
        w-full pb-0 md:pb-40 pt-0 mb-0 rounded-md
        bg-[url('/imagens/foto_perfil_pot.png')]
        bg-contain bg-right bg-no-repeat
      

        relative overflow-hidden

        before:absolute before:inset-0
        before:z-0
        transition-all duration-200
      "
    >
      <div className="max-w-auto mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* TEXTO — agora aparece abaixo no mobile */}
        <div
          ref={textRef}
          className="font-[Domine] dark:text-[#0B083D] text-[#0B083D] w-full pr-0 md:pr-8 
           order-2 md:order-1 before:absolute before:inset-0
           bg-gradient-to-r from-blue-400/80 via-blue-500/80 p-4 rounded-md to-blue-700/80
           [perspective:1200px]"
        >
          <h2 className="text-5xl md:text-4xl text-gray-200 font-bold tracking-tight mb-10 text-center 
                         md:text-left text-shadow-lg text-shadow-black/90">
            Sobre mim
          </h2>

          <p className="text-lg md:text-xl leading-relaxed mb-4 text-center md:text-left">
            Oieee, prazer em conhecê-lo! Muito bom ter você por aqui. Me chamo{" "}
            <strong className="font-sans text-[#3F4F52] dark:text-indigo-300">
              Flávio Antônio
            </strong>
            , sou natural do Rio de Janeiro. Comecei muito cedo no mundo da tecnologia.
          </p>

          <p className="text-lg md:text-xl leading-relaxed mb-4 text-center md:text-left">
            Associei minha paixão por tecnologia à minha antiga função como técnico contábil,
            criando sites e aplicações web para otimizar meu desempenho profissional.
            Nos últimos dois anos, migrei minha carreira para o desenvolvimento web,
            tornando-o minha 1ª profissão.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-center md:text-left">
            Atualmente trabalho como freelancer desenvolvendo aplicações para
            empreendedores e parceiros no mundo da tecnologia. E aí?
            Vamos juntos nessa trajetória 😉?
          </p>
        </div>
      </div>
    </section>
  );
}