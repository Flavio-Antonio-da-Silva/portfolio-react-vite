// App.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import AboutMe from "./assets/components/AboutMe";
import Services from "./assets/components/Services";
import Contactos from "./assets/components/Contactos";
import Skills from "./assets/components/Skills";
import Projects from "./assets/components/Projects";
import Footer from "./assets/components/Footer";
import MatrixBackground from "./assets/components/MatrixBackground";
import { gsap } from "gsap";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fullText =
    'Dev Front-end: Flávio <span class="block md:inline">Antônio!</span>';
  const textRef = useRef(null);

  // 🔹 Carregar preferido do usuário do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // 🔹 Aplicar/remover classe "dark" no <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-colors", "duration-700");

    if (isDarkMode) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // 🔹 Animação do título com GSAP
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = fullText;

      const newHtml = Array.from(tempDiv.childNodes)
        .map((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent
              .split("")
              .map(
                (char) =>
                  `<span class="inline-block opacity-0">${
                    char === " " ? "&nbsp;" : char
                  }</span>`
              )
              .join("");
          }
          return node.outerHTML;
        })
        .join("");

      element.innerHTML = newHtml;
      const chars = element.querySelectorAll("span");

      gsap.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="text-[#5819c2] dark:text-violet-300 min-h-screen relative">
      {/* Navbar com darkMode */}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Background Matrix animado */}
       <MatrixBackground isDarkMode={isDarkMode} speed={0.16} />

      {/* Conteúdo principal */}
      <div className="w-[95vw] mx-auto overflow-hidden relative z-10">
        <main className="pt-20 md:pt-28">
          <h1
            ref={textRef}
            className="  text-4xl md:text-5xl text-center font-bold mb-8"
          />
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
