import express from 'express';
import cors  from 'cors';
import axios from 'axios';

const app = express();

// In-memory storage for conversation history and sessions in order to avoid shared memory issues in a multi-user environment. In production, consider using a database or cache.
let sessions = {};

app.use(cors());
app.use(express.json());


app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const sessionId = req.body.sessionId;

    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }

    sessions[sessionId].push({
      role: "user",
      content: userMessage
    });


    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'llama3',
        prompt: userMessage,
        stream: false
      }
    );

    const assistantReply = response.data.message.content;

    sessions[sessionId].push({
      role: "assistant",
      content: assistantReply
    });

    res.json({
      reply: assistantReply
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Errore nella richiesta a Ollama" });
  }
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});