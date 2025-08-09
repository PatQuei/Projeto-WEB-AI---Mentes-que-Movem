document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const apiKeyInput = document.getElementById('ikey');
    const perguntaInput = document.getElementById('pergunta');
    //const chatOutput = document.getElementById('chat-output');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const apiKey = apiKeyInput.value.trim();
        const pergunta = perguntaInput.value.trim();

        if (!apiKey || !pergunta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Adiciona mensagem do usuário no chat
        adicionarMensagem(pergunta, "usuario");

        // Adiciona "Pensando..." como placeholder
        const iaMsgElemento = adicionarMensagem("Pensando...", "ia");

        // Faz requisição para IA
        await requisicaoAPI(apiKey, pergunta, iaMsgElemento);

        // Limpa input
        perguntaInput.value = "";
    });
});

/**
 * Faz a chamada para a API Gemini
 */
async function requisicaoAPI(apiKey, prompt, elementoResposta) {
    const URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const URL_FINAL = `${URL_BASE}?key=${apiKey}`;

    const objetoParaEnviar = {
        "contents": [
            {
                "parts": [
                    { "text": prompt }
                ]
            }
        ]
    };

    const parametros = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objetoParaEnviar)
    };

    try {
        const resposta = await fetch(URL_FINAL, parametros);
        const dadosDaIA = await resposta.json();

        if (dadosDaIA?.candidates?.[0]?.content?.parts?.[0]?.text) {
            elementoResposta.textContent = dadosDaIA.candidates[0].content.parts[0].text;
        } else {
            elementoResposta.textContent = "❌ Não foi possível gerar uma resposta.";
        }
    } catch (error) {
        console.error('Ocorreu um erro', error);
        elementoResposta.textContent = "❌ Erro na conexão com a API.";
    }
}

/**
 * Adiciona mensagem ao chat
 */
function adicionarMensagem(texto, tipo) {
    const chatOutput = document.getElementById('chat-output');
    const msg = document.createElement("div");

    msg.classList.add(tipo === "usuario" ? "mensagem-usuario" : "mensagem-ia");
    msg.textContent = texto;

    chatOutput.appendChild(msg);

    // Rola para o final do chat
    chatOutput.scrollTop = chatOutput.scrollHeight;

    return msg;
}
