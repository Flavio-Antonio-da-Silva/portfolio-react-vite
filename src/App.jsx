import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import MinhaImagem from "./components/MinhaImagem";
import AboutMe from "./components/AboutMe";
import Services from "./components/Services";
import RedesSociais from "./components/RedesSociais";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import MatrixRainBackground from "./components/MatrixRainBackground";
import ThreeDText from "./components/ThreeDText";

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
    <div className="relative  w-full min-h-screen overflow-x-hidden">
      {/* Background Matrix com as cores solicitadas e suporte mobile */}
      <MatrixRainBackground className="" isDarkMode={isDarkMode} speed={0.18} />

      {/* Conteúdo com z-10 para ficar acima do canvas */}
      <div className="relative z-10 w-full min-h-screen bg-transparent text-[#5819c2] dark:text-violet-300">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
               
               {/*Deixei  fora da main pra ocupar toda largura*/ }
         <ThreeDText
              className="md:w[10vw]"
              text="Flávio Desenvolvedor!"
              color={isDarkMode ? "#e8fde6" : "#1e293b"}
            />

        <main className="w-[90vw] min-h-dvh md:w-[100vw] lg:w-[80vw] xl:w-[70vw] md:py-0 mx-auto max-w-auto pt-20 md:pt-0 lg:pt-0 xl:pt-0 pb-20 flex flex-col items-center text-center">
          {/* Container do texto 3D — clipado para evitar overflow */}
          <div className="w-full md:w-full  max-w-full  ml-0 mr-0 mb-0 mt-4 font-alfa flex items-center justify-center overflow-hidden rounded-xl shadow-lg ">
           
          </div>
          <MinhaImagem />
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