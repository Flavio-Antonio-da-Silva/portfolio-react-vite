export default async function handler(req, res) {
  // Configuração de Headers para evitar problemas de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde rapidamente a requisições de pre-flight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação estrita do método
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Apenas POST permitido',
      method_received: req.method 
    });
  }

  try {
    const accessKey = process.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      return res.status(500).json({ error: "Chave de API não configurada na Vercel" });
    }

    // Extração dos dados do corpo da requisição
    const { name, email, message } = req.body;

    // Chamada para o Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: "Novo Lead - Portfólio",
        from_name: name
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, message: "Enviado com sucesso" });
    } else {
      return res.status(400).json({ error: data.message || "Erro no Web3Forms" });
    }
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ error: "Falha ao processar a requisição" });
  }
}