export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST permitido' });

  try {
    // Garantir que temos o corpo da requisição
    const body = req.body;
    if (!body || !body.email) {
      return res.status(400).json({ error: 'Corpo da requisição vazio ou inválido' });
    }

    const { name, email, message } = body;

    // Chamada para o Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        name,
        email,
        message,
        subject: "Novo Lead - Portfolio",
      }),
    });

    // VERIFICAÇÃO CRÍTICA: Se a resposta não for OK, pegue o texto puro para logar
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Web3Forms retornou erro (HTML/Texto):", errorText);
      return res.status(response.status).json({ error: "Erro na API externa" });
    }

    // Se estiver OK, aí sim tentamos o JSON
    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: data.message });
    }

  } catch (error) {
    console.error("Erro fatal na API:", error.message);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}