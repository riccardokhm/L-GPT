// Module to handle chat interactions, including saving messages and communicating with the Ollama API
import { saveMessage, getMessagesBySession } from './database.js';
import { askOllama } from './ollamaService.js';
import buildPrompt from './promptBuilder.js';

async function handleChat(sessionId, userMessage) {

  // 1. Retrieve chat history (previous messages)
  const history = await getMessagesBySession(sessionId);

  // 2. Build the prompt with system prompt, history, and user message
  const messages = buildPrompt(history, userMessage);

  // 3. Ask the model
  const reply = await askOllama(messages);

  // 4. Save the user's message and the reply
  await saveMessage(sessionId, "user", userMessage);
  await saveMessage(sessionId, "assistant", reply);

  return reply;
}

export { handleChat };