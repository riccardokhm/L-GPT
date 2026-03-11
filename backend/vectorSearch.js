function cosineSimilarity(a, b){

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for(let i = 0; i < a.length; i++){

        dotProduct += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]

    }

    normA = Math.sqrt(normA)
    normB = Math.sqrt(normB)

    return dotProduct / (normA * normB)

}

function findMostRelevant(queryEmbedding, documents, topK = 3){

    const scored = documents.map(doc => {

        const score = cosineSimilarity(queryEmbedding, doc.embedding)

        return {
            text: doc.text,
            score: score
        }

    })

    scored.sort((a,b)=> b.score - a.score)

    return scored.slice(0, topK)

}

export default {findMostRelevant};