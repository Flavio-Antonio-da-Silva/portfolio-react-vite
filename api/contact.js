const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Enviando...");

    const formData = new FormData(event.target);
    
    // Captura os dados do formulário e converte para objeto JSON
    const payload = Object.fromEntries(formData.entries());

    try {
      // Usamos o caminho direto para o arquivo para evitar 308 Redirects
      const response = await fetch("/api/contact.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Verificamos a resposta da nossa API e o status de sucesso do Web3Forms
      if (response.ok && data.success) {
        setResult("Mensagem enviada com sucesso 🚀");
        event.target.reset();
      } else {
        // Se a API retornar erro ou data.success for false
        throw new Error(data.error || "Erro ao processar envio");
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      setResult(err.message || "Erro ao enviar. Tente novamente em instantes.");
    }
  };