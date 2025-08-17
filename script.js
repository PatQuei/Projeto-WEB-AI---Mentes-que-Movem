document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const apiKeyInput = document.getElementById("ikey");
  const perguntaInput = document.getElementById("pergunta");
  const chatOutput = document.getElementById("chat-output");
  const cleanChat = document.querySelector('button[type="clean"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    chatOutput.classList.remove("hidden");

    const apiKey = apiKeyInput.value.trim();
    const pergunta = perguntaInput.value.trim();

    if (!apiKey || !pergunta) {
      alert("Por favor, preencha a API Key e a sua pergunta.");
      return;
    }

    adicionarMensagem(pergunta, "usuario");
    const { container, element } = adicionarMensagem("Pensando...", "ia");
    await requisicaoAPI(apiKey, pergunta, { container, element });
    perguntaInput.value = "";
  });

  cleanChat.addEventListener("click", (event) => {
    event.preventDefault();
    chatOutput.innerHTML = "";
    chatOutput.classList.add("hidden");
    perguntaInput.value = "";
  });
});

function adicionarMensagem(texto, tipo) {
  const chatOutput = document.getElementById("chat-output");
  const msgContainer = document.createElement("div");
  msgContainer.classList.add(tipo === "usuario" ? "mensagem-usuario" : "mensagem-ia");

  const msgElement = document.createElement("p");
  msgElement.textContent = texto;
  msgContainer.appendChild(msgElement);

  chatOutput.appendChild(msgContainer);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  return { container: msgContainer, element: msgElement };
}

// Pequena mudança: agora esta função anexa o botão ao elemento que passarmos
function adicionarBotaoCopiar(elementoPai, texto) {
  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = "Copiar resposta";
  copyBtn.classList.add("copy-btn");
  copyBtn.title = "Copiar resposta";
  
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(texto)
      .then(() => {
        copyBtn.innerHTML = "Copiado!";
        setTimeout(() => copyBtn.innerHTML = "Copiar resposta", 2000);
      });
  });
  
  elementoPai.appendChild(copyBtn);
}

// Pequena mudança: agora esta função anexa o botão ao elemento que passarmos
function adicionarBotaoLike(elementoPai) {
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.innerText = '👍';
    likeButton.title = 'Gostei da resposta';

    likeButton.addEventListener('click', () => {
        likeButton.classList.add('liked');
        likeButton.disabled = true;
    });

    elementoPai.appendChild(likeButton);
}

// --- FUNÇÃO REQUISICAOAPI ATUALIZADA ---
async function requisicaoAPI(apiKey, prompt, { container, element }) {
  const URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const URL_FINAL = `${URL_BASE}?key=${apiKey}`;

  const objetoParaEnviar = { contents: [{ parts: [{ text: prompt }] }] };
  const parametros = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objetoParaEnviar),
  };

  try {
    const resposta = await fetch(URL_FINAL, parametros);
    if (!resposta.ok) {
        const errorData = await resposta.json();
        throw new Error(errorData.error.message);
    }
    const dadosDaIA = await resposta.json();

    if (dadosDaIA?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const respostaCompleta = dadosDaIA.candidates[0].content.parts[0].text;
      
      element.innerHTML = respostaCompleta; 
      
      // --- MUDANÇA PRINCIPAL AQUI ---
      // 1. Criamos um container flex para os botões
      const botoesContainer = document.createElement('div');
      botoesContainer.className = 'botoes-container';

      // 2. Adicionamos os botões DENTRO desse novo container
      adicionarBotaoCopiar(botoesContainer, respostaCompleta);
      adicionarBotaoLike(botoesContainer);

      // 3. Adicionamos o container dos botões à mensagem principal
      container.appendChild(botoesContainer);

    } else {
      element.textContent = "❌ Não foi possível gerar uma resposta.";
    }
  } catch (error) {
    console.error("Erro na API:", error);
    element.textContent = `❌ Erro na API: ${error.message}`;
  }
}