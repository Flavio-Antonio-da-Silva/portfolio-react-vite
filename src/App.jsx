// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Contactos from './assets/components/Contactos';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';

//Mode dark/light
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
     
    // Adiciona uma transição suave para propriedades de cor e background
    html.style.transition = 'background-color 2.0s ease, color 2.0s ease';

    if (isDarkMode) {
      html.classList.add("dark");
      console.log("Modo escuro ativado");
    } else {
      html.classList.remove("dark");
      console.log("Modo claro ativado");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen p-4">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="pt-20">
        <h1 className="text-4xl text-center font-bold mb-8">Bem-vindo ao Meu Portfólio</h1>
        <AboutMe />
        <Projects />
        <Skills />
        <Contactos />
      </main>
    </div>
  );
}

export default App;