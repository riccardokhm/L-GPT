// Module to handle chat interactions, including saving messages and communicating with the Ollama API
import { saveMessage, getMessagesBySession } from './database.js';
import { askOllama } from './ollamaService.js';
import buildPrompt from './promptBuilder.js';
import createEmbedding from "./embeddingService.js";
import findMostRelevant from "./vectorSearch.js";
import { error } from 'console';

async function handleChat(sessionId, userMessage, documents) {

  try
  {
    // 1. Retrieve chat history (previous messages)
    const history = await getMessagesBySession(sessionId);

    
    // 2. Create the prompt embedding
    const embedding = await createEmbedding(userMessage);

    // 3. Finding relavaton document sources
    const relevantDocs = findMostRelevant(queryEmbedding, documents);

    const context = relevantDocs.length
      ? relevantDocs.map(d => d.text).join("\n\n")
      : "Nessun documento rilevante.";

    // 4. Build the prompt with system prompt, history, and user message
    const messages = buildPrompt(history, userMessage);

    // 5. Ask the model
    const response = await askOllama(messages);

    // 6. Save the user's message and the reply
    await saveMessage(sessionId, "user", userMessage);
    await saveMessage(sessionId, "assistant", response);

    return reply;
  }
  catch (error)
  {
      console.log(error);
  }

}

export { handleChat };