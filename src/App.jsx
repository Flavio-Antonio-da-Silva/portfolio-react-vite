// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Services from './assets/components/Services';
import Contactos from './assets/components/Contactos';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';
import Footer from './assets/components/Footer';


//Modo dark/light
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Dev Front-end: Flávio Antônio!';

  // Efeito para o modo dark/light
  useEffect(() => {
    const html = document.documentElement;
    html.style.transition = 'background-color 2.0s ease, color 2.0s ease';

    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");      
    }
  }, [isDarkMode]);

  // Efeito de digitação com setTimeout para maior segurança
  useEffect(() => {
    let currentText = '';
    let i = 0;

    const type = () => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setDisplayText(currentText);
        i++;
        setTimeout(type, 140);
      }
    };

    setTimeout(type, 100);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="text-indigo-800 dark:text-violet-300 min-h-screen">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      {/* Contêiner para centralizar o conteúdo com 95vw */}
      <div className="w-[95vw] mx-auto overflow-hidden">
        <main className="pt-50 ">
          <h1 className="text-4xl text-center font-bold mb-8">
            {displayText}
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