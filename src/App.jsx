// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Services from './assets/components/Services';
import Contactos from './assets/components/Contactos';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';
import Footer from './assets/components/Footer';
import { gsap } from 'gsap';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Texto com span para controlar quebra responsiva
  const fullText =
    'Dev Front-end: Flávio <span class="block md:inline">Antônio!</span>';

  const textRef = useRef(null);

  // Efeito para o modo dark/light
  useEffect(() => {
    const html = document.documentElement;
    html.style.transition = 'background-color 1.5s ease, color 1.5s ease';

    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Efeito SplitText com GSAP
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;

      // Divide o texto em spans (letra por letra) sem quebrar tags HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fullText;

      // Constrói o novo conteúdo preservando tags <span>
      const newHtml = Array.from(tempDiv.childNodes)
        .map((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent
              .split('')
              .map(
                (char) =>
                  `<span class="inline-block opacity-0">${
                    char === ' ' ? '&nbsp;' : char
                  }</span>`
              )
              .join('');
          }
          return node.outerHTML; // mantém spans originais intactos
        })
        .join('');

      element.innerHTML = newHtml;

      const chars = element.querySelectorAll('span');

      gsap.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="text-indigo-800 dark:text-violet-300 min-h-screen">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Contêiner para centralizar o conteúdo com 95vw */}
      <div className="w-[95vw] mx-auto overflow-hidden">
        <main className="pt-50">
          <h1
            ref={textRef}
            className="text-4xl text-center font-bold mb-8"
          >
            {/* o conteúdo real é injetado no useEffect */}
          </h1>
          <AboutMe />
          <Services />
          <Projects />
          <Skills />
          <Contactos />
        </main>
      </div>

      {/* Footer fora do contêiner para ocupar 100vw */}
      <Footer />
    </div>
  );
}

export default App;
