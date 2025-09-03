// Navbar.jsx
import React, { useState } from "react";
import { FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para rolagem suave
  const handleScrollToSection = (event, id) => {
    event.preventDefault(); // Previne o comportamento padrão do link (o salto instantâneo)
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o elemento
    }
    // Fecha o menu mobile após clicar em um item
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      id="navbar"
      className="text-blue-900 w-full  bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg text-2xl p-5"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        {/* Logo ou Título */}
        <div className="text-gray-500 text-2xl font-bold">
          
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleDarkMode} className="text-white text-2xl focus:outline-none">
            {isDarkMode ? <FaSun /> : <FaMoon />}
         {/* Ícone de menu e de modo escuro para dispositivos móveis */}
         </button>
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links de navegação e botão de modo escuro para telas grandes */}
        <div
        id="sobre" 
        className="hidden md:flex items-center space-x-8 ">
          <a
            href="#sobre-mim"
            onClick={(e) => handleScrollToSection(e, 'sobre-mim')}
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-700 transition-transform transform duration-700 hover:scale-120 rounded-md bg-gray-200 px-3 py-2"
          >
            Sobre mim
          </a>
          <a
            href="#projetos"
            onClick={(e) => handleScrollToSection(e, 'projetos')}
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform transform duration-700 hover:scale-120 bg-gray-200 rounded-md px-3 py-2"
          >
            Projetos
          </a>
          <a
            href="#habilidades"
            onClick={(e) => handleScrollToSection(e, 'habilidades')}
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform transform duration-700 hover:scale-120 bg-gray-200 rounded-md px-3 py-2"
          >
            Habilidades
          </a>
          <a
            href="#contato"
            onClick={(e) => handleScrollToSection(e, 'contato')}
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform transform duration-700 hover:scale-120 bg-gray-200 rounded-md px-3 py-2"
          >
            Contatos
          </a>
          <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white text-2xl focus:outline-none">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Ícone do WhatsApp */}
        <div className="flex flex-col items-center">
          <a
            href="https://wa.me/5521977496651"
            target="_blank"
            rel="noopener noreferrer"
           className="bg-[#25D366] text-white hover:bg-[#1DA851]  text-2xl h-10 w-18 rounded-full flex items-center justify-center transition-transform duration-500 transform hover:scale-120"
          >
            <FaWhatsapp />
          </a> <p className="text-lg text-white dark:text-gray-300 font-normal mt-1">Click para contato!</p>

        </div>
      </div>

      {/* Menu dropdown para dispositivos móveis */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-blue-400 dark:bg-gray-800 absolute top-16 left-0 w-full shadow-lg rounded-b-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <a
            href="#sobre-mim"
            onClick={(e) => handleScrollToSection(e, 'sobre-mim')}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Sobre mim
          </a>
          <a
            href="#projetos"
            onClick={(e) => handleScrollToSection(e, 'projetos')}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Projetos
          </a>
          <a
            href="#habilidades"
            onClick={(e) => handleScrollToSection(e, 'habilidades')}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Habilidades
          </a>
          <a
            href="#contato"
            onClick={(e) => handleScrollToSection(e, 'contato')}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Contatos
          </a>
        </div>
      </div>
    </nav>
  );
}