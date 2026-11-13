import type { IncomingMessage, ServerResponse } from "http";
import productService from "../Service/product.service";


const productController=(req:IncomingMessage, res:ServerResponse)=>{

    const url=req.url;
    const method=req.method;

    const products=productService();

    if(url==='/Products' && method==='GET'){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Products retrieved successfully", data:products}));
    }
    
};

export default productController;