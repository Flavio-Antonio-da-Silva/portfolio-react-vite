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
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
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
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
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
      className="w-full py-20 px-4 bg-gradient-to-r from-blue-500 
                 dark:from-gray-800 dark:to-gray-900 rounded-md mb-8
                 transition-colors duration-700 
                 transform transition-all ease-out 
                  hover:shadow-2xl hover:shadow-indigo-500/25"
    >
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-10">
        {/* Texto */}
        <div ref={textRef} className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 
                         text-white dark:text-indigo-200 text-center md:text-left">
            Sobre mim
          </h2>

          <p className="text-lg md:text-xl leading-relaxed mb-4 dark:text-gray-200 text-center md:text-left">
            Oieee, prazer em conhecê-lo! Muito bom ter você por aqui. Me chamo{" "}
            <strong className="font-sans text-[#470552] dark:text-indigo-400">
              Flávio Antônio
            </strong>
            , sou natural do Rio de Janeiro. Comecei muito cedo no mundo da tecnologia.
          </p>

          <p className="text-lg md:text-xl leading-relaxed mb-4 dark:text-gray-200 text-center md:text-left">
            Associei minha paixão por tecnologia à minha antiga função como técnico contábil, criando sites e aplicações web para otimizar meu desempenho profissional. Nos últimos dois anos, migrei minha carreira para o desenvolvimento web, tornando-o minha 1ª profissão.
          </p>

          <p className="text-lg md:text-xl leading-relaxed dark:text-gray-200 text-center md:text-left">
            Atualmente trabalho como freelancer desenvolvendo aplicações para empreendedores e parceiros no mundo da tecnologia. E aí? Vamos juntos nessa trajetória 😉?
          </p>
        </div>

        {/* Imagem */}
        <div className="flex-shrink-0">
          <img
            ref={imgRef}
            src="/imagens/para_port5.png"
            alt="Foto de Flávio"
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-cover 
                       rounded-lg shadow-xl transition-transform duration-700 
                       hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
