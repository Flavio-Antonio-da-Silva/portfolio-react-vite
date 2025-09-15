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
import MatrixBackground from './assets/components/MatrixBackground'; // 👈 importei o novo componente
import { gsap } from 'gsap';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fullText =
    'Dev Front-end: Flávio <span class="block md:inline">Antônio!</span>';

  const textRef = useRef(null);

  // Dark / light mode com transição suave
  useEffect(() => {
    const html = document.documentElement;
    html.style.transition = 'background-color 1.5s ease, color 1.5s ease';

    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Animação das letras no título
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = fullText;

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
          return node.outerHTML;
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
    <div className="text-purple-200 dark:text-violet-300 min-h-screen relative">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Background Matrix animado */}
      <MatrixBackground />

      {/* Conteúdo principal */}
      <div className="w-[95vw] mx-auto overflow-hidden relative z-10">
        <main className="pt-50">
          <h1
            ref={textRef}
            className="text-4xl  text-center font-bold mb-8"
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
