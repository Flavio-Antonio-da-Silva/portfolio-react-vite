import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contactos() {
  return (
    <section 
      id="contato"
      className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-16"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Contatos
        </h2>
        
        <p className="mb-8 max-w-2xl mx-auto text-lg">
          Fique à vontade para entrar em contato. Estou sempre aberto a novas oportunidades e parcerias!
        </p>

        <div className="flex justify-center space-x-6 text-4xl">
          {/* Link para o LinkedIn */}
          <a
            href="https://www.linkedin.com/in/fl%C3%A1vio-ant%C3%B4nio-silva-10a3bb24a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          
          {/* Link para o GitHub */}
          <a
            href="https://github.com/Flavio-Antonio-da-Silva"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          {/* Link para o Instagram */}
          <a
            href="https://www.instagram.com/flaviolemerj/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          {/* Link para o E-mail */}
          <a
            href="mailto:flavusantonio@gmail.com"
            className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </section>
  );
}