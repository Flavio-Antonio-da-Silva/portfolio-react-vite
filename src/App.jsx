// App.jsx
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-colors", "duration-700");
    html.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="text-[#5819c2] dark:text-violet-300 min-h-screen relative">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* ⚠️ Use EXATAMENTE este nome */}
      <MatrixRainBackground isDarkMode={isDarkMode} speed={0.12} />

      <div className="w-[95vw] mx-auto overflow-hidden relative z-10">
        <main className="pt-20 md:pt-28 flex flex-col items-center text-center">
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
          <Contato/>
          <Contactos />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
