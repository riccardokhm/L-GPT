import express from 'express';
import cors from 'cors';
import { handleChat } from './chatService.js';
import { initDatabase } from './database.js';
import { indexDocuments, loadDocuments } from './documentLoader.js';
import { loadEmbeddings } from './vectorStore.js';
import processNewDocument from './documentUploadService.js';

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
    let documents =[];

    try{
        const storedEmbeddings = loadEmbeddings();

        if(storedEmbeddings && storedEmbeddings.length > 0){          
            documents = storedEmbeddings;
            console.log("Document history loaded from disk...");
        }
        else{
            console.log("No stored embeddings found, indexing documents...");
            documents = await indexDocuments("./documents");
            if (documents.length == 0)
              console.log("No stored embeddings found, indexing documents...");
        }
    }
    catch (error){
      console.log(error.message);
    }

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

    app.post("/upload", async (req,res)=>{

      const { filename, content } = req.body;

      try
      {
        await processNewDocument(filename, content);
        res.json({status:"ok"});
      }
      catch(err)
      {
        console.error(err);
        res.status(500).json({error:"upload failed"});
    }});

    app.listen(3001, () => {
    console.log("Server running on port 3001...");
  });

}

Init();

