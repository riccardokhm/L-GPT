import axios from 'axios';

async function askOllama(messages) {
  const response = await axios.post(
    'http://localhost:11434/api/chat',
    {
      model: 'llama3',
      messages: messages,
      stream: false
    }
  );

  return response.data.message.content;
}

module.exports = {
  askOllama
};