import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../Service/product.service";
import type { Iproducts } from "../Types/product.types";
import { bodyParser } from "../Utils/bodyParser";


const productController=async(req:IncomingMessage, res:ServerResponse)=>{

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
        if(!products){
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify({message:"Product not found"}));
        }
        const product=products.find((p:Iproducts)=>p.id===id);
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Product retrieved successfully", data:product}));
    }
    else if(method==='POST' && url==="/Products"){
        const products=productService();
        const body=await bodyParser(req);
        const newProduct={
            id:Date.now(),
            ...body
        }

        products.push(newProduct);
        createProduct(products);

        res.writeHead(201, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Product Created successfully", data:products}));
    }
    else if(method==="PUT" && id!=null){
        const products=productService();
        const body=await bodyParser(req);
        const index=products.findIndex((p:Iproducts)=>p.id===id)
        if(index<0){
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({message:"Product does not exist", data:products}));
        }
        products[index]={
            id:products[index].id,
            ...body
        }

        createProduct(products);

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Product updated successfully", data:products[index]}));
    }
    else if(method==="DELETE" && id!=null){
        const products=productService();
        const index=products.findIndex((p:Iproducts)=>p.id===id)
        if(index<0){
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({message:"Product does not exist", data:products}));
        }
        
        products.splice(index, 1);

        createProduct(products);

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"Product updated successfully"}));
    }
    
};

export default productController;