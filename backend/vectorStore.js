import fs from "fs"

const VECTOR_FILE = "./data/embeddings.json"

function saveEmbeddings(embeddings){

    fs.writeFileSync(
    VECTOR_FILE,
    JSON.stringify(embeddings, null, 2),
    "utf-8"
    );

};

function loadEmbeddings(){

    if(!fs.existsSync(VECTOR_FILE)){
        console.log("No documents loaded in session...")
        return null;
    }

    const raw = fs.readFileSync(VECTOR_FILE,"utf-8");

    return JSON.parse(raw);

};

function addEmbeddings(newDocs){

    const existing = loadEmbeddings();

    const updated = [...existing, ...newDocs];

    saveEmbeddings(updated);

    return updated;
}

export { saveEmbeddings, loadEmbeddings, addEmbeddings};