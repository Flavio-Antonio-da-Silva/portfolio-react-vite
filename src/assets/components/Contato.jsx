import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const Contato = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Enviando...");

    const formData = new FormData(event.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar formulário");
      }

      setResult("Mensagem enviada com sucesso 🚀");
      event.target.reset();
    } catch (err) {
      console.error("Erro no envio:", err);
      setResult(err.message || "Erro ao enviar. Tente novamente em instantes.");
    }
  };

  return (
    <section
      id="contato"
      /* Adicionado mb-20 para separar da section de baixo e my-10 para respiro */
      className="py-20 my-10 mb-20 rounded-3xl bg-gradient-to-t from-blue-600 via-blue-500 to-blue-100"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo */}
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 leading-tight text-left">
              Clique abaixo para conversarmos e eu saber como poderei te ajudar
            </h2>

            {/* Wrapper para centralizar somente o botão */}
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://wa.me/21977496651?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all shadow-md shadow-green-200 active:scale-95 w-fit"
              >
                <FaWhatsapp className="w-7 h-7" />
                <span>Clique aqui para conversarmos!</span>
              </a>

              <p className="text-gray-900 text-sm text-center">
                Atendimento rápido e direto no WhatsApp.
              </p>
            </div>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Metadados ocultos para o Web3Forms */}
              <input type="hidden" name="subject" value="Novo Lead - Portfolio" />
              <input type="hidden" name="from_name" value="Portfolio Flávio" />

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ex: Flávio Antonio Silva"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Seu melhor e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Como podemos te ajudar?
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Fale sobre seu projeto..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-200 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none text-slate-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] text-lg uppercase tracking-wider"
              >
                Enviar solicitação agora
              </button>

              {result && (
                <div
                  className={`text-center p-3 rounded-lg font-bold animate-pulse ${
                    result.includes("sucesso")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
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

export default Contato;