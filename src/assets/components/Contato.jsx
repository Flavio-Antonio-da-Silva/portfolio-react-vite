import React, { useState } from 'react';
import {FaWhatsapp} from "react-icons/fa";


const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Enviando...");

    const formData = new FormData(event.target);
    
    // Sua access_key (é pública e segura conforme docs da Web3Forms)
    formData.append("access_key", "334824b2-67bb-4968-aa76-42b303ae7e42");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Mensagem enviada com sucesso! Em breve retorno seu contato.");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult("Ocorreu um erro: " + (data.message || "Tente novamente."));
    }
  };

  return (
    <section id="contato" className="py-24 bg-gradient-to-t rounded-md from-blue-600 via-blue-500 to-blue-100 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: Texto de Venda / Apresentação */}
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              Pronto para transformar sua ideia em um <span className="text-[#FFD700]">projeto digital incrível</span>?
            </h2>
            <p className="text-lg text-[#F0F8FF] mb-8 leading-relaxed text-start">
              Sou Flávio A. Silva, desenvolvedor frontend no Rio de Janeiro. Especializado em React, Vite, Three.js, animações GSAP e interfaces modernas. Vamos criar algo único juntos? Me conte sobre seu projeto, desafio ou oportunidade.
            </p>
           
            <div className="space-y-4">
              <div>
                <a
                  href="https://wa.me/55SEUNUMEROAQUI?text=Ol%C3%A1%20Fl%C3%A1vio%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all shadow-md shadow-green-200 active:scale-95"
                > 
                  <FaWhatsapp className="w-8 h-8 mr-2 text-white" />
                  Envie uma mensagem agora no meu WhatsApp
                </a>
              </div>
             
              <p className="mt-4 text-gray-900 text-sm">
                Pode enviar sua mensagem em qualquer horário e dia, inclusive finais de semana. Retorno imediato em horário comercial. 
              </p>
            </div>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Campos hidden para personalizar o email */}
              <input type="hidden" name="subject" value="Novo contato do portfólio - Flávio A. Silva" />
              <input type="hidden" name="from_name" value="Portfólio Flávio Silva" />
              <input type="hidden" name="replyto" value="%email%" />

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Seu Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ex: João Oliveira"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 
             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
             transition-all outline-none 
             text-gray-900 placeholder:text-gray-500"   // ← aqui as correções
                />
              </div>
             
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">SEU MELHOR E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 
             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
             transition-all outline-none 
             text-gray-900 placeholder:text-gray-500"   // ← aqui as correções
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">FALE SOBRE SEU PROJETO OU IDEIA</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Diga como posso ajudar  em seu projeto ou na sua empresa!"
                 className="w-full px-4 py-3 rounded-xl border border-slate-200 
             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
             transition-all outline-none 
             text-gray-900 placeholder:text-gray-500"   // ← aqui as correções
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-yellow-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] text-lg uppercase tracking-wider"
              >
                ENVIAR MENSAGEM AGORA
              </button>
             
              {result && (
                <div className={`text-center p-3 rounded-lg font-bold animate-pulse ${result.includes("sucesso") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;