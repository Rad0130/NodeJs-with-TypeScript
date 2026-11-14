import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../Service/product.service";
import type { Iproducts } from "../Types/product.types";
import { bodyParser } from "../Utils/bodyParser";
import { serverResponse } from "../Utils/serverResponse";


const productController=async(req:IncomingMessage, res:ServerResponse)=>{

    const url=req.url;
    const method=req.method;

    const urlParam=url?.split('/');
    const id=urlParam && urlParam[1]==="Products"? Number(urlParam[2]) : null;

    const products=productService();

    if(url==='/Products' && method==='GET'){
        try{
            serverResponse(res, true, 200, "Products retrieved successfully", products)
        }
        catch(error){
            serverResponse(res, false, 404, "Internal server error")
        }
    }
    else if(method==='GET' && id!=null){
        if(!products){
            serverResponse(res, false, 400, "Product not found")
        }
        const product=products.find((p:Iproducts)=>p.id===id);
        serverResponse(res, true, 200, "Product retrieved successfully", product)
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
        serverResponse(res, true, 200, "Product created successfully", products);
        
    }
    else if(method==="PUT" && id!=null){
        const products=productService();
        const body=await bodyParser(req);
        const index=products.findIndex((p:Iproducts)=>p.id===id)
        if(index<0){
            serverResponse(res, false, 404, "Product dosen't exist", products);
        }
        products[index]={
            id:products[index].id,
            ...body
        }

        createProduct(products);

        serverResponse(res, true, 200, "Product updated successfully", products);
    }
    else if(method==="DELETE" && id!=null){
        const products=productService();
        const index=products.findIndex((p:Iproducts)=>p.id===id)
        if(index<0){
            serverResponse(res, false, 404, "Product dosen't exist", products);
        }
        
        products.splice(index, 1);

        createProduct(products);

        serverResponse(res, true, 200, "Product deleted successfully", products);
    }
    
};

export default productController;