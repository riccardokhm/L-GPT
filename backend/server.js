import express from 'express';
import cors from 'cors';
import { handleChat } from './chatService.js';
import { initDatabase } from './database.js';
import { indexDocuments, loadDocuments } from './documentLoader.js';

async function Init()
{
    // Initialization
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Checking Ollama Api is on
    const response  = await fetch("http://localhost:11434/");
    if(response)
    {
      console.log("Ollama up and running...");
    }
    else
    {
      console.log("No Ollama API found... Please install Ollama!");
      throw new Error("Shutting down the application...");
    }

    // Loading documents
    const documents = await indexDocuments("./documents").then(() => console.log("Document history successfully loaded"));

    // Init the chat message history
    await initDatabase().then(() => {
      console.log("Database initialized");
    }).catch((err) => {
      console.error("Error initializing database:", err);
    });

    // Setting up the server endpoints.
    app.get('/test', (req, res) => {
      res.json({ message: "Server up and running!" });
    });

    app.post('/chat', async (req, res) => {
      try {
        const { sessionId, message } = req.body;

        const reply = await handleChat(sessionId, message, documents);

        res.json({ reply });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(3001, () => {
    console.log("Server running on port 3001...");
  });

}

Init();

