// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { gsap } from "gsap";

export default function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]); 
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

  const addToRefs = (el) => {
    if (!el) return;
    if (!linksRef.current.includes(el)) {
      linksRef.current.push(el);

      const onEnter = () => {
        gsap.to(el, { scale: 1.12, duration: 0.7, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.7, ease: "power2.out" });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }
  };

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );
    }

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: "power3.out" }
      );
    }

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
  }, []);

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
      className="w-full h-24 bg-blue-500 dark:bg-gray-900 shadow-md fixed top-0 z-50 rounded-b-lg text-2xl"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full relative">
        {/* Logo - Centralizado Verticalmente via flex items-center */}
        <div ref={logoRef} className="flex items-center h-full">
          <a href="#sobre-mim" onClick={(e) => handleScrollToSection(e, "sobre-mim")} className="flex items-center">
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
        <div className="hidden md:flex items-center space-x-8 h-full">
          {navIds.map((id, i) => (
            <a
              key={i}
              ref={addToRefs}
              href={`#${id}`}
              onClick={(e) => handleScrollToSection(e, id)}
              className="text-white dark:text-blue-400 hover:text-yellow-300
                  transition-transform transform duration-300
                  rounded-md bg-blue-600 dark:bg-gray-800 px-3 py-2 text-lg"
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

        {/* WhatsApp - Centralizado Verticalmente */}
        <div className="flex flex-col items-center justify-center h-full px-4">
          <a
            href="https://wa.me/5521977496651"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white hover:bg-[#1DA851] text-2xl h-10 w-16 rounded-full flex items-center justify-center transform transition duration-300 hover:scale-110"
            aria-label="Contato WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <p className="text-[10px] sm:text-xs text-white dark:text-gray-300 font-normal mt-1 whitespace-nowrap">
            Click para contato!
          </p>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        ref={mobileMenuRef}
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-blue-400 dark:bg-gray-800 absolute top-full left-0 w-full shadow-lg rounded-b-lg`}
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