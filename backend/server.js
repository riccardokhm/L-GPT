import express from 'express';
import cors from 'cors';
import { handleChat } from './chatService';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    const reply = await handleChat(sessionId, message);

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server avviato su porta 3001");
});