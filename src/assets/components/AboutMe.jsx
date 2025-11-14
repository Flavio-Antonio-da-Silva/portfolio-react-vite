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
      className="w-full py-20 px-4 bg-gradient-to-r from-blue-300 via-blue-400 via-blue-500 to-green-200
                 dark:from-gray-800 dark:to-gray-900 rounded-md mb-8
                 transition-colors duration-700 transform transition-all"
    >
      <div className="max-w-auto mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* TEXTO PRIMEIRO */}
        <div ref={textRef} className="font-domine w-full pr-0 md:pr-8 text-[#4B0082] text-shadow-2xs text-shadow-yellow-900 ">
          <h2 className="text-3xl md:text-4xl text-gray-200 font-bold tracking-tight mb-10 text-center md:text-left text-shadow-lg text-shadow-black/90">
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

        


        {/* IMAGEM SEGUNDO — agora aparece à direita no desktop */}
        <div className="w-full flex justify-center md:justify-end">
          <img
            ref={imgRef}
            src="/imagens/foto_perfil_pot.png"
            alt="Foto de Flávio"
            className="
              w-[95%]
              sm:w-[85%]
              md:w-[100%]
              lg:max-w-[1068px]
              lg:h-[568px]
              object-contain
              rounded-2xl
              transition-transform
              duration-300
            "
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
