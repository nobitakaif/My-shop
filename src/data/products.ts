import { db } from "@/db"
import {  products } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getAllProducts(){
    try{
        const product = await db.select().from(products);
        return product
    }catch(e){
        console.log("Error white getting all the product")
        return []
    }
}

export async function getRecommendedProducts(){
    try{
        const productData = await db.select().from(products).limit(3)
        return productData
    }catch(e){
        console.log(`Error getting recommended products : `, e)
        return [];
    }
}

export async function getProductById(id: string){
    try{
        const product = await db.select().from(products).where(eq(products.id, id as string)).limit(1)
        return product[0] ?? null
    }catch(e){
        console.log('Error getting products by id : ', e)
        return null
    }
}

 