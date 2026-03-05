// Module to handle chat interactions, including saving messages and communicating with the Ollama API
import { saveMessage, getMessagesBySession } from './database';
import { askOllama } from './ollamaService';

async function handleChat(sessionId, userMessage) {

  // 1. Save the user's message
  await saveMessage(sessionId, "user", userMessage);

  // 2. Retrieve chat history
  const history = await getMessagesBySession(sessionId);

  // 3. Ask the model
  const reply = await askOllama(history);

  // 4. Save the reply
  await saveMessage(sessionId, "assistant", reply);

  return reply;
}

module.exports = {
  handleChat
};