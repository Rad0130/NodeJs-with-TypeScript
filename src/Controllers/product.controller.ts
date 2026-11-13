import type { IncomingMessage, ServerResponse } from "http";
import productService from "../Service/product.service";
import type { Iproducts } from "../Types/product.types";


const productController=(req:IncomingMessage, res:ServerResponse)=>{

    const url=req.url;
    const method=req.method;

    const urlParam=url?.split('/');
    const id=urlParam && urlParam[1]==="Products"? Number(urlParam[2]) : null;

    const products=productService();

    if(url==='/Products' && method==='GET'){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Products retrieved successfully", data:products}));
    }
    else if(method==='GET' && id!=null){
        const product=products.find((p:Iproducts)=>p.id===id);
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Product retrieved successfully", data:product}));
    }
    
};

export default productController;