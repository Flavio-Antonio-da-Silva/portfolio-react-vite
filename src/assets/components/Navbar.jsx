// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { gsap } from "gsap";

export default function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);
  linksRef.current = [];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScrollToSection = (event, id) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    if (isOpen) setIsOpen(false);
  };

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    if (linksRef.current.length > 0) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)",
          clearProps: "transform", // 🔑 mantém o hover:scale-110 funcionando
        }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      id="navbar"
      className="w-full h-20 bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg text-2xl"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        {/* Logo */}
        <div className="text-white dark:text-gray-200 text-2xl font-bold">
          Portfólio
        </div>

        {/* Botões Mobile */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="text-white dark:text-yellow-400 text-2xl focus:outline-none transform transition duration-300 hover:scale-110 active:scale-95"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none transform transition duration-300 hover:scale-110 active:scale-95"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {["sobre-mim", "servicos", "projetos", "habilidades", "contato"].map(
            (id, i) => (
              <a
                key={i}
                ref={addToRefs}
                href={`#${id}`}
                onClick={(e) => handleScrollToSection(e, id)}
                className="text-white dark:text-blue-400 hover:text-yellow-300
                  transition-transform transform duration-300 hover:scale-110
                  rounded-md bg-blue-600 dark:bg-gray-800 px-3 py-2"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            )
          )}
          <button
            onClick={toggleDarkMode}
            className="text-white dark:text-yellow-400 text-2xl focus:outline-none transform transition duration-300 hover:scale-110"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center py-4 px-4">
          <a
            href="https://wa.me/5521977496651"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white hover:bg-[#1DA851] text-2xl h-9 w-14 rounded-full flex items-center justify-center transform transition duration-300 hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <p className="text-sm text-white dark:text-gray-300 font-normal mt-1">
            Click para contato!
          </p>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-blue-400 dark:bg-gray-800 absolute top-16 left-0 w-full shadow-lg rounded-b-lg transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {["sobre-mim", "projetos", "habilidades", "contato"].map((id, i) => (
            <a
              key={i}
              href={`#${id}`}
              onClick={(e) => handleScrollToSection(e, id)}
              className="w-full text-center text-white dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transform transition duration-300 hover:scale-110"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
