import { saveMessage, getMessagesBySession } from './database';
import { askOllama } from './ollamaService';

async function handleChat(sessionId, userMessage) {

  // 1. Salva messaggio utente
  await saveMessage(sessionId, "user", userMessage);

  // 2. Recupera storico
  const history = await getMessagesBySession(sessionId);

  // 3. Chiedi al modello
  const reply = await askOllama(history);

  // 4. Salva risposta
  await saveMessage(sessionId, "assistant", reply);

  return reply;
}

module.exports = {
  handleChat
};