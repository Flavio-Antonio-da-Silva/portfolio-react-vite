export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: "Novo Lead - Portfolio",
        from_name: "Portfolio Website",
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ error: data.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("API Contact Error:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
