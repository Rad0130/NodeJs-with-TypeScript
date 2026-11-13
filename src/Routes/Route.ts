import type { IncomingMessage, ServerResponse } from "http";
import productController from "../Controllers/product.controller";


const handleRoutes=(req:IncomingMessage, res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;

    if(url==="/" && method==="GET"){
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({Message:"This is the Root"}))
    }
    else if(url?.startsWith("/Products")){
        productController(req,res);
    }
    else{
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({Message:"this root is undefined"}))
    }
};

export default handleRoutes;