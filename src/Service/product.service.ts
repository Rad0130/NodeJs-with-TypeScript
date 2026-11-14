import path from "node:path";
import fs from "fs";
import type { Iproducts } from "../Types/product.types";

const filepath=path.join(process.cwd(), "./src/Database/db.json")

export const productService=()=>{
    const result=fs.readFileSync(filepath, "utf-8");
    return JSON.parse(result);
};


export const createProduct=(payload:Iproducts)=>{
    fs.writeFileSync(filepath, JSON.stringify(payload));
}