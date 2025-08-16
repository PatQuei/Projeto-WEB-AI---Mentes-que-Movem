
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const apiKeyInput = document.getElementById("ikey");
  const perguntaInput = document.getElementById("pergunta");
  const chatOutput = document.getElementById("chat-output");
  const cleanChat = document.getElementById("clean");

//O próximo bloco de código é responsável por limpar e ocultar a interface do chat quando o botão "Limpar Chat" é clicado.


  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    chatOutput.classList.remove("hidden");

    const apiKey = apiKeyInput.value.trim();
    const pergunta = perguntaInput.value.trim();

    if (!apiKey || !pergunta) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Adiciona mensagem do usuário no chat
    adicionarMensagem(pergunta, "usuario");

    // Adiciona "Pensando..." como placeholder
    const { container, element } = adicionarMensagem("Pensando...", "ia");

    // Chama a API e só depois adiciona o botão de cópia
    await requisicaoAPI(apiKey, pergunta, { container, element });

    // Limpa o input
    perguntaInput.value = "";
  });
  cleanChat.addEventListener("click", () => {
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML = ""; // Limpa o conteúdo do chat
    chatOutput.classList.add("hidden"); // Oculta o chat
    document.getElementById("pergunta").value = ""; // Limpa o input de pergunta
});
  });

    cleanChat.addEventListener("click", () => {
    const chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML = ""; // Limpa o conteúdo do chat
    chatOutput.classList.add("hidden"); // Oculta o chat
    document.getElementById("pergunta").value = ""; // Limpa o input de pergunta
});
});




// Função para adicionar mensagens ao chat
function adicionarMensagem(texto, tipo) {
  const chatOutput = document.getElementById("chat-output");
  const msgContainer = document.createElement("div");
  msgContainer.classList.add(tipo === "usuario" ? "mensagem-usuario" : "mensagem-ia");

  const msg = document.createElement("div");
  msg.textContent = texto;
  msgContainer.appendChild(msg);

  chatOutput.appendChild(msgContainer);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  return { container: msgContainer, element: msg };
};

// Função para adicionar o botão de cópia **apenas após a resposta final**
function adicionarBotaoCopiar(container, texto) {
  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = "Copiar resposta";
  copyBtn.classList.add("copy-btn");
  copyBtn.title = "Copiar resposta";
  
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(texto)
      .then(() => {
        copyBtn.innerHTML = " Copiado!";
        setTimeout(() => copyBtn.innerHTML = "Copiar resposta", 2000);
      })
      .catch(() => {
        copyBtn.innerHTML = "Erro ao copiar";
        setTimeout(() => copyBtn.innerHTML = "Copiar resposta", 2000);
      });
  });
  
  container.appendChild(copyBtn);
}

// Função que chama a API do Gemini e atualiza a resposta
async function requisicaoAPI(apiKey, prompt, { container, element }) {
  const URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const URL_FINAL = `${URL_BASE}?key=${apiKey}`;

  const objetoParaEnviar = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const parametros = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objetoParaEnviar),
  };

  try {
    const resposta = await fetch(URL_FINAL, parametros);
    const dadosDaIA = await resposta.json();

    if (dadosDaIA?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const respostaCompleta = dadosDaIA.candidates[0].content.parts[0].text;
      element.textContent = respostaCompleta; // Atualiza o texto
      adicionarBotaoCopiar(container, respostaCompleta); // Adiciona botão **só aqui**
    } else {
      element.textContent = "❌ Não foi possível gerar uma resposta.";
    }
  } catch (error) {
    console.error("Erro na API:", error);
    element.textContent = "❌ Erro na conexão com a API.";
  }
}

/**
 * Adiciona mensagem ao chat
 */
function adicionarMensagem(texto, tipo) {
  const chatOutput = document.getElementById("chat-output");
  const msg = document.createElement("div");

  msg.classList.add(tipo === "usuario" ? "mensagem-usuario" : "mensagem-ia");
  msg.textContent = texto;

  chatOutput.appendChild(msg);

  // Rola para o final do chat
  chatOutput.scrollTop = chatOutput.scrollHeight;

  return msg;
};
