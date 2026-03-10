function chunkText(text, chunkSize = 500){

    const words = text.split(" ")

    let chunks = []

    for(let i = 0; i < words.length; i += chunkSize){

        const chunk = words.slice(i, i + chunkSize).join(" ")

        chunks.push(chunk)

    }

    return chunks

}

export {chunkText};