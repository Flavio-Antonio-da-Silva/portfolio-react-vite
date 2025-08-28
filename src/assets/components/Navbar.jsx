// Navbar.jsx
import React, { useState } from "react";
import { FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      id="navbar"
      className="text-blue-900 w-full bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg text-2xl p-5"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        {/* Logo ou Título */}
        <div className="text-gray-500 text-2xl font-bold">
          
        </div>

        {/* Ícone de menu e de modo escuro para dispositivos móveis */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleDarkMode} className="text-white text-2xl focus:outline-none">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links de navegação e botão de modo escuro para telas grandes */}
        <div className="hidden md:flex items-center space-x-8 ">
          <a
            href="sobre"
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-700 transition rounded-md bg-gray-200 px-3 py-2"
          >
            Sobre mim
          </a>
          <a
            href="#projetos"
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition bg-gray-200 rounded-md px-3 py-2"
          >
            Projetos
          </a>
          <a
            href="#contato"
            className="text-gray-800 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition bg-gray-200 rounded-md px-3 py-2"
          >
            Contatos
          </a>
          <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white text-2xl focus:outline-none">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Ícone do WhatsApp */}
        <div className="flex items-center">
          <a
            href="https://wa.me/5521977496651"
            target="_blank"
            rel="noopener noreferrer"
           className="bg-[#25D366] text-white hover:bg-[#1DA851] transition text-2xl h-8 w-8 rounded-full flex items-center justify-center"
          >
            <FaWhatsapp />
          </a>
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
            href="sobre"
            onClick={toggleMenu}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Sobre mim
          </a>
          <a
            href="#projetos"
            onClick={toggleMenu}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Projetos
          </a>
          <a
            href="#contato"
            onClick={toggleMenu}
            className="w-full text-center text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transition"
          >
            Contatos
          </a>
        </div>
      </div>
    </nav>
  );
}