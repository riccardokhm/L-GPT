import { useState } from "react";
import { uploadDocument } from "./api";

function Upload(){

    const [text,setText] = useState("");

    async function handleUpload(){
        await uploadDocument("userDoc.txt",text);
        alert("Documento caricato");
    }

 return(
  <div>
   <textarea value={text} onChange={(e)=>setText(e.target.value)}/>
   <button onClick={handleUpload}> Upload document</button>
  </div>
 )

}

export default Upload;