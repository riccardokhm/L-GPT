// Module to handle interactions with the Ollama API for chat functionality
// Porting to streaming the messagges.
import axios from 'axios';

async function askOllama(messages) {
  const response = await axios.post(
    'http://localhost:11434/api/chat',
    {
      model: 'llama3',
      messages: messages,
      stream: false
    }
    // {
    //   responseType:"stream"
    // }
  );

  return response.data.message.content; //response.data
}

export { askOllama };