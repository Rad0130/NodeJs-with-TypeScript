import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import handleRoutes from "./Routes/Route";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    handleRoutes(req,res);
});

server.listen(5000,()=>{
    console.log("Server is ruinnig successfully!!");
});

