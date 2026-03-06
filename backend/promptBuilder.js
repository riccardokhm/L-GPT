// Creating the prompt builder for the AI to generate the response
function buildPrompt(history, userMessage){

const systemPrompt = {
role: "system",
content: "Sei un assistente AI utile. Rispondi sempre in italiano in modo chiaro."
}

const messages = [
systemPrompt,
...history,
{
role: "user",
content: userMessage
}
]

return messages

}

export default buildPrompt