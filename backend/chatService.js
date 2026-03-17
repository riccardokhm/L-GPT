// Module to handle chat interactions, including saving messages and communicating with the Ollama API
import { saveMessage, getMessagesBySession } from './database.js';
import { askOllama } from './ollamaService.js';
import buildPrompt from './promptBuilder.js';
import createEmbedding from "./embeddingService.js";
import findMostRelevant from "./vectorSearch.js";

async function handleChat(sessionId, userMessage, documents) {

  try
  {

    let relevantDocs = [];

    // 1. Retrieve chat history (previous messages)
    const history = await getMessagesBySession(sessionId);

    if(documents?.length)
    {
      // 2. Create the prompt embedding
      const embedding = await createEmbedding(userMessage);

      // 3. Finding relavaton document sources
      if(embedding){
        relevantDocs = findMostRelevant(embedding, documents);
      }
    }
    
    const context = relevantDocs.length
      ? relevantDocs.map(d => d.text).join("\n\n")
      : "No relevants documents.";

    // 4. Build the prompt with system prompt, history, and user message
    const messages = buildPrompt(history, userMessage, context);

    // 5. Ask the model
    const response = await askOllama(messages);

    // 6. Save the user's message and the reply
    await saveMessage(sessionId, "user", userMessage);
    await saveMessage(sessionId, "assistant", response);

    return response;
  }
  catch (error)
  {
      console.log(error);
  }

}

export { handleChat };