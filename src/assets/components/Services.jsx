// src/assets/components/Services.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FaWhatsapp } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function FloatingCube({ color = "#13E191" }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.5;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.5;
      mesh.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const servicesData = [
  {
    title: "💡 Design Responsivo e Inteligente",
    description:
      "Layouts adaptáveis que funcionam em qualquer dispositivo: desktop, tablet ou smartphone. Nada de perder clientes por experiência ruim no mobile!",
  },
  {
    title: "🔗 Tecnologia que conecta",
    description:
      "Integração de APIs, bancos de dados e SEO para colocar seu site em destaque nos buscadores.",
  },
  {
    title: "🎯 Experiência do Usuário em Primeiro Lugar",
    description:
      "Interfaces intuitivas, rápidas e visualmente impactantes — porque design não só encanta, como converte.",
  },
  {
    title: "📈 Transforme seu negócio ou carreira",
    description:
      "Seu site será uma ferramenta poderosa para atrair clientes, gerar autoridade e crescer online.",
  },
  {
    title: "🚀 Serviços",
    description:
      "Impulsione sua presença digital com soluções sob medida! Sou desenvolvedor especializado em sites modernos, landing pages de alta conversão, e-commerces eficientes, portfólios profissionais e páginas institucionais — tudo 100% personalizado para refletir sua marca e atingir seus objetivos.",
  },
  {
    title: "💡 Design Responsivo e Inteligente",
    description:
      "Seus projetos terão layouts adaptáveis que funcionam perfeitamente em qualquer dispositivo: desktops, tablets e smartphones.",
  },
];

export default function Services() {
  const cardsRef = useRef([]);
  const whatsappRef = useRef(null);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: idx * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    if (whatsappRef.current) {
      gsap.to(whatsappRef.current, {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section
      id="servicos"
      className="w-full py-20 px-4 bg-gradient-to-r from-teal-500 
                 dark:from-gray-800 dark:text-rose-200 rounded-md mb-8
                 transform transition-all duration-700 ease-out 
                 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 
                 hover:-translate-y-1 hover:rotate-1 group"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
          Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {servicesData.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-default flex items-center space-x-4"
            >
              <div className="w-16 h-16">
                <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <FloatingCube />
                </Canvas>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                  {service.title}
                </h3>
                <p className="text-md md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-12 space-y-4 md:space-y-0 md:space-x-6">
          <p className="text-lg text-center max-w-xl">
            Entre em contato e descubra como podemos levar sua presença digital
            ao próximo nível!
          </p>
          <a
            ref={whatsappRef}
            href="https://wa.me/seu-numero-aqui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg"
          >
            <FaWhatsapp size={36} />
          </a>
        </div>
      </div>
    </section>
  );
}
