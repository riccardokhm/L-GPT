import chunkText from "./textChunker.js"
import createEmbedding from "./embeddingService.js"
import { addEmbeddings } from "./vectorStore.js"

async function processNewDocument(filename, content){

    const chunks = chunkText(content);

    const indexed = [];

    for(const chunk of chunks){

        const embedding = await createEmbedding(chunk);

        indexed.push({
            file: filename,
            text: chunk,
            embedding
        })

    }

    const updatedStore = addEmbeddings(indexed);

    return updatedStore;
}

export default processNewDocument;