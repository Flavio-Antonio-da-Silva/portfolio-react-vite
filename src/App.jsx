// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import AboutMe from "./assets/components/AboutMe";
import Services from "./assets/components/Services";
import Contactos from "./assets/components/Contactos";
import Skills from "./assets/components/Skills";
import Projects from "./assets/components/Projects";
import Footer from "./assets/components/Footer";
import MatrixBackground from "./assets/components/MatrixBackground";
import ThreeDText from "./assets/components/ThreeDText";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🔹 Carregar preferido do usuário do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  // 🔹 Aplicar/remover classe "dark" no <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-colors", "duration-700");
    html.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="text-[#5819c2] dark:text-violet-300 min-h-screen relative">
      {/* Navbar com darkMode */}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Background Matrix animado */}
      <MatrixBackground isDarkMode={isDarkMode} speed={0.16} />

      {/* Conteúdo principal */}
      <div className="w-[95vw] mx-auto overflow-hidden relative z-10">
        <main className="pt-20 md:pt-28 flex flex-col items-center text-center">
          {/* Texto 3D responsivo */}
          <div className="w-full max-w-4xl h-[180px] md:h-[220px] mb-12">
            <ThreeDText
              text="Dev Front-end: Flávio Antônio!"
              color={isDarkMode ? "#13E191" : "#5819c2"}
            />
          </div>

          {/* Seções */}
          <AboutMe />
          <Services />
          <Projects />
          <Skills />
          <Contactos />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
