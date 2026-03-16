const API_URL = "http://localhost:3001/chat";
const API_UPLOAD = "http://localhost:3001/upload";

export async function sendMessage(message, sessionId){

    const response = await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ message, sessionId})
    });

    const data = await response.json();

    return data.response;
}

export async function uploadDocument(filename, content){
    const res = await fetch(API_UPLOAD,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({filename, content})
    });

    return res.json();
}