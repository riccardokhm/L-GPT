function buildPrompt(history, userMessage, context) {

    const systemPrompt = {
        role: "system",
        content: `
            Sei un assistente AI utile.

            Rispondi sempre in italiano.

            Usa i documenti seguenti per rispondere alla domanda dell'utente.
            Se l'informazione non è presente nei documenti, rispondi usando la tua conoscenza generale.

            DOCUMENTI:
            ${context}
            `
        }

    return [
        systemPrompt,
        ...history,
        {
            role: "user",
            content: userMessage
        }
    ]

}

export default buildPrompt;