// Ollama API could be used instead.

export default async function createEmbedding(text){

    console.log("Embedding input:", text);

    if(!text){
        throw new Error("Embedding text is undefined");
    }

    const response = await fetch("http://localhost:11434/api/embed", {
        method: "POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({
            model: "nomic-embed-text",
            prompt: text
        })
    });

    const data = await response.json();

    console.log("Embedding response:", data);

    if(!data.embeddings){
        throw new Error("Embedding generation failed");
    }

    return data.embeddings;
}




