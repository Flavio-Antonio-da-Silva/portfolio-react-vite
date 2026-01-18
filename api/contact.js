export default async function handler(req, res) {
  // Configuração de CORS para evitar erros de origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST é permitido' });
  }

  try {
    // Em módulos ESM na Vercel, às vezes é necessário ler o body manualmente 
    // ou garantir que ele foi parseado.
    const body = req.body;

    if (!body || !body.email) {
      return res.status(400).json({ error: 'Dados do formulário não recebidos corretamente' });
    }

    const { name, email, message } = body;

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
        from_name: "Portfolio Flávio",
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: data.message || 'Erro no Web3Forms' });
    }
  } catch (error) {
    console.error("Erro na API:", error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}