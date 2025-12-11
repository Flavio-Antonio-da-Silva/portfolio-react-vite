// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { gsap } from "gsap";

export default function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]); // manter array de refs aqui (não reatribuir)
  const mobileMenuRef = useRef(null);
  const darkModeBtnMobileRef = useRef(null);
  const darkModeBtnDesktopRef = useRef(null);

  const navIds = ["sobre-mim", "servicos", "projetos", "habilidades", "contato"];

  const toggleMenu = () => setIsOpen((v) => !v);

  const handleScrollToSection = (event, id) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (isOpen) setIsOpen(false);
  };

  // Função para coletar refs e aplicar animações on hover (apenas uma vez por element)
  const addToRefs = (el) => {
    if (!el) return;
    // evitar adicionar duplicatas
    if (!linksRef.current.includes(el)) {
      linksRef.current.push(el);

      // adicionar handlers de hover com GSAP (defensivo — remove handlers se já existir)
      const onEnter = () => {
        gsap.to(el, { scale: 1.12, duration: 0.7, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.7, ease: "power2.out" });
      };

      // Use addEventListener para evitar problemas com re-render
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }
  };

  useEffect(() => {
    // Animação navbar (entrando do topo)
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );
    }

    // Logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: "power3.out" }
      );
    }

    // Links desktop: animar os itens já setados em linksRef
    if (linksRef.current.length > 0) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.45,
          stagger: 0.12,
          ease: "back.out(1.4)",
          clearProps: "transform",
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // executar só no mount

  // Dark mode button rotation quando isDarkMode muda
  useEffect(() => {
    const targetDesktop = darkModeBtnDesktopRef.current;
    const targetMobile = darkModeBtnMobileRef.current;

    if (targetDesktop) {
      gsap.fromTo(
        targetDesktop,
        { rotate: 0 },
        { rotate: 360, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
    if (targetMobile) {
      gsap.fromTo(
        targetMobile,
        { rotate: 0 },
        { rotate: 360, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, [isDarkMode]);

  // Animação do menu mobile quando abrir/fechar
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      id="navbar"
      className="w-full h-20 bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg text-2xl"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          <a href="#sobre-mim" onClick={(e) => handleScrollToSection(e, "sobre-mim")}>
            <img
              src="/imagens/Logo_Marca.png"
              alt="Logo Marca"
              className="h-16 w-auto object-contain rounded-full select-none"
            />
          </a>
        </div>

        {/* Botões Mobile */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            ref={darkModeBtnMobileRef}
            onClick={toggleDarkMode}
            className="text-white dark:text-yellow-400 text-2xl focus:outline-none transform transition duration-300 hover:scale-110 active:scale-95"
            aria-label="Alternar tema"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none transform transition duration-300 hover:scale-110 active:scale-95"
            aria-label="Abrir menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navIds.map((id, i) => (
            <a
              key={i}
              ref={addToRefs}
              href={`#${id}`}
              onClick={(e) => handleScrollToSection(e, id)}
              className="text-white dark:text-blue-400 hover:text-yellow-300
                  transition-transform transform duration-300
                  rounded-md bg-blue-600 dark:bg-gray-800 px-3 py-2"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}

          <button
            ref={darkModeBtnDesktopRef}
            onClick={toggleDarkMode}
            className="text-white dark:text-yellow-400 text-2xl focus:outline-none transform transition duration-300 hover:scale-110"
            aria-label="Alternar tema"
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
            aria-label="Contato WhatsApp"
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
        ref={mobileMenuRef}
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-blue-400 dark:bg-gray-800 absolute top-16 left-0 w-full shadow-lg rounded-b-lg`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navIds.map((id, i) => (
            <a
              key={i}
              href={`#${id}`}
              onClick={(e) => handleScrollToSection(e, id)}
              className="w-full text-center text-white dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 py-2 transform transition duration-300"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
