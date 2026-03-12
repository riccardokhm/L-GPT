import fs from "fs";
import path from "path";
import chunkText from "./textChunker.js"
import createEmbedding from "./embeddingService.js"

export async function indexDocuments(folderPath){

    const rawDocs = loadDocuments(folderPath);

    const indexedDocs = [];

    for(const doc of rawDocs)
    {

        const chunks = chunkText(doc.content);

        for(const chunk of chunks)
        {

            const embedding = await createEmbedding(chunk);

            indexedDocs.push({
                file: doc.file,
                text: chunk,
                embedding
            });
        }
    }

    return indexedDocs;
}

export function loadDocuments(folderPath){

    const files = fs.readdirSync(folderPath);

    let documents = [];

    for(const file of files){

        const fullPath = path.join(folderPath, file);

        const content = fs.readFileSync(fullPath, "utf-8");

        documents.push({
            file: file,
            content: content,
            embedding: []
        });
    }

    return documents;
}

