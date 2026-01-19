export default async function handler(req, res) {
  // 1. Corrigir o nome da variável de ambiente
  const accessKey = process.env.VITE_WEB3FORMS_KEY; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST permitido' });
  }

  try {
    const { name, email, message } = req.body;

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
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: data.message });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}