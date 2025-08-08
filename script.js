
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const apiKeyInput = document.getElementById('ikey');
    const perguntaInput = document.getElementById('pergunta');
    const botaoEnviar = document.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const apiKey = apiKeyInput.value;
        const pergunta = perguntaInput.value;
        if (!apiKey || !pergunta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        await requisicaoAPI(apiKey, pergunta);
    });
});

async function requisicaoAPI(apiKey, prompt) {
const URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const URL_FINAL = `${URL_BASE}?key=${apiKey}`;
  
        //const prompt = process.argv[2];
        const objetoParaEnviar = {
           "contents": [
            {
              "parts": [
                {
                   "text": prompt
                 }
               ]
            }
           ]
         }
        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objetoParaEnviar)
        };
    try {
        const resposta = await fetch(URL_FINAL, parametros);
        const dadosDaIA = await resposta.json();
        const textoResposta = dadosDaIA.candidates[0].content.parts[0].text;
        console.log(textoResposta);
    } catch(error) {
        console.error('Ocorreu um erro', error);
    }
}




