import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import handleRoutes from "./Routes/Route";
import config from "./config";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    handleRoutes(req,res);
});

server.listen(config.port,()=>{
    console.log(`Server is ruinnig successfully on port ${config.port}`);
});

