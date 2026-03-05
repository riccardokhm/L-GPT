# L-GPT
A lightweight chatbot service that runs locally and delegates language understanding and generation to an external Ollama model.

## Overview
L-GPT is a Node.js application comprised of a backend API and an optional frontend. It accepts user messages via HTTP POST, stores conversation history in a local database, and forwards context to an Ollama-managed language model. The model's response is returned to the client and also persisted.

The architecture is modular:

* **Server (Express)** – handles routing, input validation and error handling.
* **chatService** – orchestrates saving messages, retrieving history and invoking the Ollama API.
* **database** – simple persistence layer for chat sessions and messages.
* **ollamaService** – wraps calls to the Ollama model endpoint.

The goal is to provide a self‑hosted chatbot interface while outsourcing heavy model computation to Ollama, enabling offline development and faster iteration. 
