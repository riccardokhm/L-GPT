import fs from "fs";
import path from "path";

function loadDocuments(folderPath){

    const files = fs.readdirSync(folderPath);

    let documents = [];

    for(const file of files){

    const fullPath = path.join(folderPath, file);

    const content = fs.readFileSync(fullPath, "utf-8");

    documents.push({
    file: file,
    content: content
    });

    }

    return documents;
}

export {loadDocuments};