import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./assets/components/Navbar";
import AboutMe from "./assets/components/AboutMe";
import Services from "./assets/components/Services";
import RedesSociais from "./assets/components/RedesSociais";
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
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Matrix com as cores solicitadas e suporte mobile */}
      <MatrixRainBackground isDarkMode={isDarkMode} speed={0.18} />

      {/* Conteúdo com z-10 para ficar acima do canvas */}
      <div className="relative z-10 w-full min-h-screen bg-transparent text-[#5819c2] dark:text-violet-300">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <main className="w-[95vw] max-w-6xl mx-auto pt-20 md:pt-28 pb-20 flex flex-col items-center text-center">
          {/* Container do texto 3D */}
          <div className="w-full max-w-4xl h-[150px] md:h-[280px] mb-12 font-alfa">
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
          <RedesSociais />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;