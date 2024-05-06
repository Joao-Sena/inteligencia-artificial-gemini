const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
  
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyCFiyyMnnIu5Pqp2LyQg0HJi9doZDP9m9k";
  
async function runChat() {

    const textInput = document.getElementById('inputPergunta').value;

    if(textInput.length) {
        
        const containerPerguntaChat = document.getElementById('containerPerguntaChat');
        containerPerguntaChat.classList.remove('d-none');
        
        const perguntaChat = document.getElementById('perguntaChat');
        perguntaChat.innerText(textInput);
        
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        const generationConfig = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
        };
    
        const safetySettings = [
            {
            // PRIMEIRO VEM A CATEGORIA: ASSÉDIO
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            // SEGUNDO O NÍVEL QUE AQUELA RESPOSTA VAI RESPEITAR ESSE "FILTRO"
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            // EX: categoria: tragédias
            // Ex: limite: Bloqueie algumas
            // CATEGORIA: FALAS DE ÓDIO
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            // category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            // CATEGÓRIA: CONTEÚDO EXPLICITO (ex: explicar como funcionam certas coisas, ou responder dúvidas sobre certos temas)
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            // Conteúdos perigosos
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
    
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
            ],
        });
    
        const result = await chat.sendMessage("YOUR_USER_INPUT");
        const response = result.response;
        console.log(response.text());
        const containerRespostaChat = document.getElementById('containerRespostaChat');
        containerRespostaChat.classList.remove('d-none');
        const respostaChat = document.getElementById('respostaChat');
        respostaChat.innerText(response.text());

    } else {
        window.alert('Escreva no campo ao lado antes de perguntar!')
    }
 
}
