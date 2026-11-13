import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;

    if(url==="/" && method==="GET"){
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({Message:"This is the Root"}))
    }
    else if(url?.startsWith("/Products")){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"This is product Route"}))
    }
    else{
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({Message:"this root is undefined"}))
    }
});

server.listen(5000,()=>{
    console.log("Server is ruinnig successfully!!");
});

