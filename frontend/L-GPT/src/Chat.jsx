import { useState } from "react"
import { sendMessage } from "./api"

function Chat(){

    const [messages,setMessages] = useState([]);
    const [input,setInput] = useState("Ask me something...");

    async function handleSend(){

        const userMessage = {role:"user",content: input};

        setMessages(prev => [...prev,userMessage]);

        const reply = await sendMessage(input,"session1");

        const aiMessage = {
            role:"assistant",
            content: reply
        };

        setMessages(prev => [...prev,aiMessage]);
        setInput("");
    };

 return (
  <div>

   <div>
    {messages.map((m,i)=>(
     <div key={i}>
      <b>{m.role}</b>: {m.content}
     </div>
    ))}
   </div>

   <input
    value={input}
    onChange={(e)=>setInput(e.target.value)}
   />

   <button onClick={handleSend}>
    Send
   </button>

  </div>
 )

}

export default Chat;