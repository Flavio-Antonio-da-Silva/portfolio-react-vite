import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './assets/components/Navbar';
import AboutMe from './assets/components/AboutMe';
import Services from './assets/components/Services';
import Contactos from './assets/components/Contactos';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';
import Footer from './assets/components/Footer';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


// Componente que agrupa as seções da página inicial
function Home() {
    return (
        <>
            <AboutMe />
            <Services />
            <Projects />
            <Skills />
            <Contactos />
        </>
    );
}

//Modo dark/light
function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Dev Front-end: Flávio Antônio!';
    const bgTlRef = useRef();

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
                setTimeout(type, 140);
            }
        };
        setTimeout(type, 100);
    }, []);

    // Efeito de rolagem suave com GSAP
    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: targetElement,
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }, []);

    // Animação do background no modo claro e escuro
    useEffect(() => {
        if (bgTlRef.current) {
            bgTlRef.current.kill();
        }
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        if (!isDarkMode) {
            tl.to("body", { backgroundPosition: "10% 10%", duration: 20, ease: "none" });
        } else {
            tl.to("body", { backgroundPosition: "90% 90%", duration: 20, ease: "none" });
        }
        bgTlRef.current = tl;
        return () => {
            if (bgTlRef.current) {
                bgTlRef.current.kill();
            }
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <BrowserRouter>
            <div className="text-indigo-800 dark:text-violet-300 min-h-screen">
                <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="w-[95vw] mx-auto overflow-hidden">
                    <main className="pt-50 ">
                        <h1 className="text-4xl text-center font-bold mb-8">
                            {displayText}
                        </h1>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/* Rotas para páginas separadas, se você decidir criá-las */}
                            {/* <Route path="/sobre" element={<AboutMe />} /> */}
                            {/* <Route path="/servicos" element={<Services />} /> */}
                            {/* ... e assim por diante */}
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App; 