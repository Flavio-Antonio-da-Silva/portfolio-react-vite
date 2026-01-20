import { useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("Enviando...");

    const formData = new FormData(e.target);
    
    // Access key é pública e segura para expor no frontend (conforme docs oficiais Web3Forms)
    formData.append("access_key", "334824b2-67bb-4968-aa76-42b303ae7e42");
    formData.append("subject", "Nova mensagem do portfólio"); // Opcional
    formData.append("from_name", "Portfólio Site");           // Opcional

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Mensagem enviada com sucesso! ✓ Obrigado pelo contato.");
        e.target.reset();
      } else {
        setResult(data.message || "Erro ao enviar. Tente novamente mais tarde.");
      }
    } catch (error) {
      setResult("Falha na conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Seu nome" 
            required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Seu email" 
            required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <textarea 
            name="message" 
            placeholder="Sua mensagem" 
            rows={5} 
            required 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>

      {result && (
        <p className={`mt-6 text-center font-medium ${result.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
          {result}
        </p>
      )}
    </div>
  );
}