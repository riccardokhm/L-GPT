import express from 'express';
import cors from 'cors';
import { handleChat } from './chatService.js';
import { initDatabase } from './database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: "Server funzionante!" });
});

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
  // Initialize the database when the server starts
  initDatabase().then(() => {
    console.log("Database initialized");
  }).catch((err) => {
    console.error("Error initializing database:", err);
  });
});

