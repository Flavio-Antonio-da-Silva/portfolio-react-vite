import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contactos() {
  return (
    <section 
      id="RedesSociais"
      className="w-full rounded-lg bg-gray-900 dark:bg-gray-800 text-blue-500 dark:text-gray-100 py-20"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-shadow-lg text-shadow-white/90">
          Acesse Minhas Redes Sociais!
        </h2>
        


                        <div className="flex justify-center space-x-6 text-4xl">
                        {/* Link para o LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/fl%C3%A1vio-ant%C3%B4nio-silva-10a3bb24a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors transition-transform transform duration-700 hover:scale-180"
                  aria-label="LinkedIn"
                >
                  <img
                    src="/imagens/linkedin-icon.png"
                    alt="Ícone do LinkedIn"
                    className="w-9 h-9 bg-white rounded-md" // Adicione classes para controlar o tamanho da imagem
                  />
                </a>
          
          {/* Link para o GitHub */}
          <a
            href="https://github.com/Flavio-Antonio-da-Silva"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100  transition-transform transform duration-700 hover:scale-180 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <img 
              src="/imagens/github-icon.png"
              alt="Ícone do GitHub"
              className="w-9 h-9 bg-white rounded-full"
             />
          </a>

          {/* Link para o Instagram */}
          <a
            href="https://www.instagram.com/flaviolemerj/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform duration-700 hover:scale-180 text-white-100 rounded-md dark:text-white-400 dark:hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <img
              src="/imagens/instagram.png"
              alt="Ícone do Instagram"
              className="w-9 h-9 bg-white rounded-md"
            />
          </a>

          {/* Link para o E-mail */}
          <a
            href="mailto:flavusantonio@gmail.com"
            className="text-gray-600  hover:text-red-600 transition-transform transform duration-700 hover:scale-180 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            aria-label="Email"
          >
            <img
              src="/imagens/gmail-icon.png"
              alt="Ícone do E-mail"
              className="w-9 h-9 bg-white rounded-md"
            />
          </a>
        </div>
      </div>
    </section>
  );
}