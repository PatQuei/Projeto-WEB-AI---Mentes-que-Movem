# **Projeto WEB AI — Mentes que Movem**

Bem vindo ao terceiro projeto do grupo **Mentes que Movem**! 

## CRIANDO UM ASSISTENTE DE IA 🤖

Este repositório é um espaço colaborativo onde estamos aplicando os conhecimentos, este é um projeto web que implementa um assistente virtual usando a API Gemini da Google para geração de texto. Ele permite que o usuário faça perguntas e receba respostas geradas pela inteligência artificial.

![Descrição do GIF](![alt text](https://i.imgur.com/xi06X3E.gif))

## O Grupo

Aqui estão os membros do nosso time. Juntos, estamos movendo mentes e criando soluções\!

  * André
  * Ana Técia 
  * Edmilson Júnior
  * Jenifer Castro 
  * Patricia Queiroz 
  *  Victória Mignon

## O Projeto

### Assistente de IA com API Gemini

* **Descrição:**  
  Uma aplicação web que permite ao usuário fazer perguntas e receber respostas geradas por inteligência artificial utilizando a API Gemini da Google. A interface apresenta um chat com histórico das perguntas e respostas.

* **Funcionalidades principais:**  
  - Inserção segura da API Key Gemini.  
  - Seleção do modelo Gemini para gerar as respostas.  
  - Envio de perguntas via formulário.  
  - Exibição das respostas em tempo real no chat.  
  - Mensagem de carregamento ("Pensando...") enquanto aguarda a resposta da IA.  
  - Interface responsiva e intuitiva.

  **Pasta:**  
  [`/assistente-ia`](https://github.com/PatQuei/Projeto-WEB-AI---Mentes-que-Movem.git)

## Como Contribuir

Quer ajudar a melhorar o projeto? Siga estes passos:

1. Faça um fork do repositório.  
2. Crie uma branch com sua feature: `git checkout -b minha-nova-feature`  
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova funcionalidade'`  
4. Envie para o repositório remoto: `git push origin minha-nova-feature`  
5. Abra um Pull Request descrevendo suas mudanças.

## Tecnologias Usadas

Este projeto utiliza:

  * **HTML5** para a estrutura da página.  
  * **CSS3** para o estilo e responsividade.  
  * **JavaScript (Vanilla)** para lógica e integração com a API.  
  * **API Gemini (Google Generative Language API)** para geração das respostas inteligentes.

-----

## Como Usar

1. Clone o repositório ou baixe o projeto.  
2. Abra o arquivo `index.html` no navegador.  
3. Insira sua chave de API Gemini no campo correspondente.  
4. Escolha o modelo desejado no seletor.  
5. Digite sua pergunta e clique em **Perguntar**.  
6. Aguarde a resposta da IA aparecer no chat.

-----

## Detalhes Técnicos

- O código JavaScript escuta o envio do formulário e previne recarregamento da página.  
- Ele verifica se a API Key e a pergunta estão preenchidas.  
- A pergunta do usuário é exibida no chat e uma mensagem “Pensando...” aparece enquanto a resposta é buscada.  
- A função `requisicaoAPI` envia a pergunta para a API Gemini via fetch POST.  
- A resposta gerada é inserida na área do chat.  
- Caso ocorra algum erro na requisição, uma mensagem de erro aparece para o usuário.  

-----

📄 Licença
Este projeto está sob a licença ISC.

-----

Grupo Mentes que Movem 🧠  
*Movendo mentes, criando soluções!*



