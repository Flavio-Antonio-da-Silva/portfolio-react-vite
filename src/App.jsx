// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Contactos from './assets/components/Contactos';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';

//Mode dark/light
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
        setTimeout(type, 140); // Chama a função novamente após 180ms
      }
    };

    setTimeout(type, 100); // Inicia o efeito
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      className=" text-black dark:text-white min-h-screen p-8">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="pt-20">
        <h1 className="text-4xl text-center font-bold mb-8 text-purple-400">
          {displayText}
        </h1>
        <AboutMe />
        <Projects />
        <Skills />
        <Contactos />
      </main>
    </div>
  );
}

export default App;