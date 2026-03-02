import express from 'express';
import cors  from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: "pong" });
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'llama3',
        prompt: userMessage,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
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