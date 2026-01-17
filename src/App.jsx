import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./assets/components/Navbar";
import AboutMe from "./assets/components/AboutMe";
import Services from "./assets/components/Services";
import Contactos from "./assets/components/Contactos";
import Skills from "./assets/components/Skills";
import Projects from "./assets/components/Projects";
import Contato from "./assets/components/Contato";
import Footer from "./assets/components/Footer";
import MatrixRainBackground from "./assets/components/MatrixRainBackground";
import ThreeDText from "./assets/components/ThreeDText";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      // Se não houver nada salvo, o padrão será Dark (true)
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // CORES DE FUNDO HARDCODED PARA EVITAR O BRANCO NO MOBILE
    const bgDark = "#05080d";
    const bgLight = "#C0C0C0";
    const currentColor = isDarkMode ? bgDark : bgLight;

    // Aplica a cor diretamente no HTML e BODY
    html.style.backgroundColor = currentColor;
    body.style.backgroundColor = currentColor;
    
    if (isDarkMode) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    // 'bg-transparent' é crucial para deixar o MatrixRain aparecer atrás
    <div className="relative min-h-screen w-full bg-transparent text-[#5819c2] dark:text-violet-300">
      
      {/* Componente de Background fixo no fundo */}
      <MatrixRainBackground isDarkMode={isDarkMode} speed={0.15} />

      {/* Conteúdo com z-index maior para ficar por cima da chuva */}
      <div className="relative z-10 w-full">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <main className="w-[95vw] mx-auto pt-20 md:pt-28 flex flex-col items-center text-center">
          <div className="w-full max-w-4xl h-[150px] md:h-[220px] mb-8 font-alfa">
            <ThreeDText
              text="Desenvolvedor: Flávio Antônio!"
              color={isDarkMode ? "#e8fde6" : "#1e293b"}
            />
          </div>

          <AboutMe />
          <Services />
          <Projects />
          <Skills />
          <Contato />
          <Contactos />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;