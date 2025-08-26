import React from "react";
import { FaWhatsapp } from "react-icons/fa";


export default function Navbar() {
  return (
    <nav className="w-full bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Links de navegação */}
        <div className="hidden md:flex space-x-8">
          <a
            href="sobre"
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition rounded-md px-3 py-2"
          >
            Sobre mim.
          </a>
          <a
            href="#projetos"
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition rounded-md px-3 py-2"
          >
            Projetos
          </a>

          <a
            href="#contato"
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition rounded-md px-3 py-2"
          >
            Contatos
          </a>
        </div>

        
        <div className="flex items-center">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 transition text-2xl"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </nav>
  );
}