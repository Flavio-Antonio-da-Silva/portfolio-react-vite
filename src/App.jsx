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
    // Inicialização preguiçosa para evitar flicker no mobile
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true; // Padrão dark
    }
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
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
    // Removi o pointer-events-none do container pai para permitir que o Matrix receba o touchmove
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#5819c2] dark:text-violet-300">
      
      <MatrixRainBackground isDarkMode={isDarkMode} speed={0.15} />

      <div className="relative z-10">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <main className="w-[95vw] mx-auto pt-20 md:pt-28 flex flex-col items-center text-center">
          <div className="w-full max-w-4xl h-[180px] md:h-[220px] mb-12 font-alfa">
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